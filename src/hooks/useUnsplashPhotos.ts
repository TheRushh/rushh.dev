import { useState, useEffect } from 'react'
import type { UnsplashPhoto } from '@/data'

const UNSPLASH_USERNAME = 'therushh'
const CACHE_KEY = 'unsplash-photos-v1'
// Unsplash demo tier allows 50 req/hr app-wide, so cache aggressively
const CACHE_TTL_MS = 60 * 60 * 1000

function readCache(): UnsplashPhoto[] | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as { timestamp?: number; photos?: UnsplashPhoto[] }
    if (typeof entry.timestamp !== 'number' || !Array.isArray(entry.photos)) return null
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null
    return entry.photos
  } catch {
    return null
  }
}

function writeCache(photos: UnsplashPhoto[]): void {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), photos }))
  } catch {
    // Storage unavailable (private mode, restricted embeds) — skip caching
  }
}

export function useUnsplashPhotos() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    if (!accessKey) {
      setError('Unsplash access key not configured')
      setLoading(false)
      return
    }

    const cached = readCache()
    if (cached) {
      setPhotos(cached)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/users/${UNSPLASH_USERNAME}/photos?per_page=12&order_by=latest`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Client-ID ${accessKey}`,
              'Accept-Version': 'v1',
            },
          }
        )
        if (!res.ok) throw new Error('Failed to fetch photos')
        const data: UnsplashPhoto[] = await res.json()

        setPhotos(data)
        writeCache(data)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load photos')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}

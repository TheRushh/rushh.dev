import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useUnsplashPhotos } from './useUnsplashPhotos'
import type { UnsplashPhoto } from '@/data'

const CACHE_KEY = 'unsplash-photos-v1'

const makePhoto = (id: string): UnsplashPhoto => ({
  id,
  width: 4000,
  height: 3000,
  color: '#262626',
  alt_description: `Photo ${id}`,
  description: null,
  likes: 12,
  created_at: '2026-01-15T12:00:00Z',
  urls: {
    small: `https://images.unsplash.com/photo-${id}?w=400`,
    regular: `https://images.unsplash.com/photo-${id}?w=1080`,
  },
  links: {
    html: `https://unsplash.com/photos/${id}`,
  },
})

const stubFetch = (impl: ReturnType<typeof vi.fn>) => {
  vi.stubGlobal('fetch', impl)
  return impl
}

describe('useUnsplashPhotos', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.stubEnv('VITE_UNSPLASH_ACCESS_KEY', 'test-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('fetches photos with the expected URL and headers, then caches them', async () => {
    const photos = [makePhoto('a'), makePhoto('b')]
    const fetchMock = stubFetch(vi.fn().mockResolvedValue({ ok: true, json: async () => photos }))

    const { result } = renderHook(() => useUnsplashPhotos())
    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.photos).toEqual(photos)
    expect(result.current.error).toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.unsplash.com/users/therushh/photos?per_page=12&order_by=latest',
      expect.objectContaining({
        headers: {
          Authorization: 'Client-ID test-key',
          'Accept-Version': 'v1',
        },
      })
    )

    const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY) ?? '{}')
    expect(cached.photos).toEqual(photos)
    expect(typeof cached.timestamp).toBe('number')
  })

  it('errors without fetching when the access key is missing', async () => {
    vi.stubEnv('VITE_UNSPLASH_ACCESS_KEY', '')
    const fetchMock = stubFetch(vi.fn())

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Unsplash access key not configured')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('sets an error on non-OK responses and does not cache', async () => {
    stubFetch(vi.fn().mockResolvedValue({ ok: false }))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Could not load photos')
    expect(result.current.photos).toEqual([])
    expect(window.localStorage.getItem(CACHE_KEY)).toBeNull()
  })

  it('sets an error when the request rejects', async () => {
    stubFetch(vi.fn().mockRejectedValue(new Error('network down')))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.error).toBe('Could not load photos'))
  })

  it('stays silent when the request is aborted', async () => {
    const fetchMock = stubFetch(
      vi.fn().mockRejectedValue(Object.assign(new Error('aborted'), { name: 'AbortError' }))
    )

    const { result, unmount } = renderHook(() => useUnsplashPhotos())
    unmount()

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(result.current.error).toBeNull()
  })

  it('serves a fresh cache without fetching', async () => {
    const photos = [makePhoto('cached')]
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), photos }))
    const fetchMock = stubFetch(vi.fn())

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.photos).toEqual(photos)
    expect(result.current.error).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('refetches and overwrites a stale cache', async () => {
    const stale = { timestamp: Date.now() - 61 * 60 * 1000, photos: [makePhoto('old')] }
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(stale))
    const fresh = [makePhoto('new')]
    const fetchMock = stubFetch(vi.fn().mockResolvedValue({ ok: true, json: async () => fresh }))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.photos).toEqual(fresh))
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY) ?? '{}')
    expect(cached.photos).toEqual(fresh)
    expect(cached.timestamp).toBeGreaterThan(stale.timestamp)
  })

  it('ignores a corrupt cache entry', async () => {
    window.localStorage.setItem(CACHE_KEY, '{not json')
    const photos = [makePhoto('a')]
    const fetchMock = stubFetch(vi.fn().mockResolvedValue({ ok: true, json: async () => photos }))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.photos).toEqual(photos))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('ignores a cache entry missing a timestamp', async () => {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ photos: [makePhoto('old')] }))
    const photos = [makePhoto('a')]
    const fetchMock = stubFetch(vi.fn().mockResolvedValue({ ok: true, json: async () => photos }))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.photos).toEqual(photos))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('ignores a cache entry with the wrong photos shape', async () => {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), photos: 'nope' })
    )
    const photos = [makePhoto('a')]
    const fetchMock = stubFetch(vi.fn().mockResolvedValue({ ok: true, json: async () => photos }))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.photos).toEqual(photos))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('still loads when localStorage access throws', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('denied')
    })
    const photos = [makePhoto('a')]
    stubFetch(vi.fn().mockResolvedValue({ ok: true, json: async () => photos }))

    const { result } = renderHook(() => useUnsplashPhotos())

    await waitFor(() => expect(result.current.photos).toEqual(photos))
    expect(result.current.error).toBeNull()
  })
})

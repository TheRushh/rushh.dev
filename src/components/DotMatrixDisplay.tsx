import { useEffect, useRef, useState, useCallback } from 'react'

// 5x7 bitmap font patterns for coding-related characters
const FONT_PATTERNS: Record<string, number[][]> = {
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  C: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  J: [
    [0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  ' ': [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  '.': [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  '+': [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
}

const CODING_WORDS = [
  'REACT',
  'TYPESCRIPT',
  'NODE',
  'PYTHON',
  'RUST',
  'GO',
  'AWS',
  'DOCKER',
  'GIT',
  'API',
  'SQL',
  'CSS',
  'HTML',
  'NEXT',
  'VITE',
]

interface DotState {
  x: number
  y: number
  targetOpacity: number
  currentOpacity: number
  color: string
  targetColor: string
}

interface WordPlacement {
  word: string
  col: number
  row: number
  color: string
}

// Theme-appropriate colors (RGB format)
const DARK_THEME_COLORS = [
  '129, 140, 248', // indigo
  '167, 139, 250', // purple
  '248, 113, 113', // red
  '251, 191, 36', // amber
  '52, 211, 153', // emerald
  '56, 189, 248', // sky
]

const LIGHT_THEME_COLORS = [
  '79, 70, 229', // indigo
  '124, 58, 237', // purple
  '220, 38, 38', // red
  '217, 119, 6', // amber
  '5, 150, 105', // emerald
  '2, 132, 199', // sky
]

const DotMatrixDisplay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const dotsRef = useRef<DotState[]>([])
  const [theme, setTheme] = useState<string>('dark')
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [wordPlacements, setWordPlacements] = useState<WordPlacement[]>([])

  const DOT_SPACING = 20
  const DOT_RADIUS = 1.3
  const CHAR_WIDTH = 5
  const CHAR_HEIGHT = 7
  const CHAR_SPACING = 1

  // Theme detection
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      setTheme(currentTheme)
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Convert text to dot pattern
  const getTextPattern = useCallback((text: string): boolean[][] => {
    const pattern: boolean[][] = Array(CHAR_HEIGHT)
      .fill(null)
      .map(() => [])

    for (const char of text.toUpperCase()) {
      const charPattern = FONT_PATTERNS[char] || FONT_PATTERNS[' ']
      for (let row = 0; row < CHAR_HEIGHT; row++) {
        pattern[row].push(...charPattern[row].map(v => v === 1))
        // Add spacing between characters
        for (let s = 0; s < CHAR_SPACING; s++) {
          pattern[row].push(false)
        }
      }
    }
    return pattern
  }, [])

  // Generate random placements for multiple words
  const generatePlacements = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return []

    const cols = Math.ceil(dimensions.width / DOT_SPACING)
    const rows = Math.ceil(dimensions.height / DOT_SPACING)
    const placements: WordPlacement[] = []
    const occupied: boolean[][] = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false))

    // Calculate max words based on screen width
    const isMobile = dimensions.width < 768
    const maxWords = isMobile ? 5 : 15

    // On mobile, prefer shorter words to avoid overlap
    let wordPool = [...CODING_WORDS]
    if (isMobile) {
      wordPool = wordPool.filter(w => w.length <= 6)
    }
    const shuffled = wordPool.sort(() => Math.random() - 0.5).slice(0, maxWords)

    for (const word of shuffled) {
      const textWidth = word.length * (CHAR_WIDTH + CHAR_SPACING)
      const textHeight = CHAR_HEIGHT

      // Try random positions
      let placed = false
      for (let attempts = 0; attempts < 50 && !placed; attempts++) {
        const col = Math.floor(Math.random() * (cols - textWidth - 4)) + 2
        const row = Math.floor(Math.random() * (rows - textHeight - 4)) + 2

        // Check if area is free
        let canPlace = true
        for (let r = row - 1; r < row + textHeight + 1 && canPlace; r++) {
          for (let c = col - 1; c < col + textWidth + 1 && canPlace; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && occupied[r][c]) {
              canPlace = false
            }
          }
        }

        if (canPlace) {
          const colors = theme === 'light' ? LIGHT_THEME_COLORS : DARK_THEME_COLORS
          const color = colors[Math.floor(Math.random() * colors.length)]
          placements.push({ word, col, row, color })
          // Mark area as occupied
          for (let r = row - 1; r < row + textHeight + 1; r++) {
            for (let c = col - 1; c < col + textWidth + 1; c++) {
              if (r >= 0 && r < rows && c >= 0 && c < cols) {
                occupied[r][c] = true
              }
            }
          }
          placed = true
        }
      }
    }

    return placements
  }, [dimensions, theme])

  // Initialize and update dots
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const cols = Math.ceil(dimensions.width / DOT_SPACING)
    const rows = Math.ceil(dimensions.height / DOT_SPACING)

    const baseColor = theme === 'light' ? '0, 0, 0' : '255, 255, 255'

    // Initialize dots if needed
    if (dotsRef.current.length !== cols * rows) {
      dotsRef.current = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dotsRef.current.push({
            x: x * DOT_SPACING + DOT_SPACING / 2,
            y: y * DOT_SPACING + DOT_SPACING / 2,
            targetOpacity: 0.06,
            currentOpacity: 0.06,
            color: baseColor,
            targetColor: baseColor,
          })
        }
      }
    }

    // Reset all dots to background opacity and base color
    for (const dot of dotsRef.current) {
      dot.targetOpacity = 0.06
      dot.targetColor = baseColor
    }

    // Apply all word patterns with their colors
    for (const placement of wordPlacements) {
      const textPattern = getTextPattern(placement.word)

      for (let textRow = 0; textRow < CHAR_HEIGHT; textRow++) {
        for (let textCol = 0; textCol < textPattern[0].length; textCol++) {
          if (textPattern[textRow][textCol]) {
            const col = placement.col + textCol
            const row = placement.row + textRow
            const idx = row * cols + col

            if (idx >= 0 && idx < dotsRef.current.length) {
              dotsRef.current[idx].targetOpacity = 0.85
              dotsRef.current[idx].targetColor = placement.color
            }
          }
        }
      }
    }
  }, [dimensions, wordPlacements, getTextPattern, theme])

  // Regenerate placements periodically
  useEffect(() => {
    if (dimensions.width === 0) return

    // Initial placement
    setWordPlacements(generatePlacements())

    const interval = setInterval(() => {
      setWordPlacements(generatePlacements())
    }, 5000)

    return () => clearInterval(interval)
  }, [dimensions, generatePlacements])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smooth opacity and color transitions
      for (const dot of dotsRef.current) {
        const diff = dot.targetOpacity - dot.currentOpacity
        dot.currentOpacity += diff * 0.08 // Easing factor
        dot.color = dot.targetColor

        // Add glow effect for lit dots
        if (dot.currentOpacity > 0.2) {
          ctx.shadowBlur = 15
          ctx.shadowColor = `rgba(${dot.color}, ${dot.currentOpacity * 0.8})`
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dot.color}, ${dot.currentOpacity})`
        ctx.fill()
      }

      // Reset shadow
      ctx.shadowBlur = 0

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, dimensions])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      />
    </div>
  )
}

export default DotMatrixDisplay

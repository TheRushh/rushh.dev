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
  '0': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '1': [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  '2': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  '3': [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '4': [
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  '5': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '6': [
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '7': [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  '8': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '9': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
}

const CODING_WORDS = [
  'JAVA',
  'J2EE',
  'SPRING',
  'SPRING BOOT',
  'PYTHON',
  'DJANGO',
  'KOTLIN',
  'GO',
  'TYPESCRIPT',
  'JAVASCRIPT',
  'REACT',
  'ANGULAR',
  'NODE',
  'EXPRESS',
  'BUN',
  'HTML',
  'CSS',
  'DOCKER',
  'KUBERNETES',
  'K8S',
  'OPENSHIFT',
  'AWS',
  'AZURE',
  'GCP',
  'MYSQL',
  'MONGODB',
  'ORACLE',
  'GRAPHQL',
  'FIREBASE',
  'JENKINS',
  'BAMBOO',
  'ARGOCD',
  'ANSIBLE',
  'GRADLE',
  'MAVEN',
  'GITHUB',
  'BITBUCKET',
  'GIT',
  'TOMCAT',
  'NET',
  'API',
  'REST',
  'JDBC',
  'SQL',
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
  colorIndex: number
}

// Theme-appropriate colors (RGB format) - Bold and vibrant
const DARK_THEME_COLORS = [
  '14, 165, 233', // bright cyan - primary
  '168, 85, 247', // vivid purple - secondary
  '6, 182, 212', // neon cyan - accent
  '16, 185, 129', // bright emerald - success
  '245, 158, 11', // bold amber - warning
  '239, 68, 68', // vivid red - error
]

const LIGHT_THEME_COLORS = [
  '2, 132, 199', // bold cyan - primary
  '147, 51, 234', // deep purple - secondary
  '8, 145, 178', // bright teal - accent
  '5, 150, 105', // vibrant emerald - success
  '217, 119, 6', // bold amber - warning
  '220, 38, 38', // strong red - error
]

const DotMatrixDisplay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const dotsRef = useRef<DotState[]>([])
  const [theme, setTheme] = useState<string>('dark')
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [wordPlacements, setWordPlacements] = useState<WordPlacement[]>([])
  const [isInitializing, setIsInitializing] = useState(true)
  const staticNoiseRef = useRef<number[]>([])
  const staticColorIndicesRef = useRef<number[]>([])
  const transitionProgressRef = useRef(0)

  const DOT_SPACING = 15
  const DOT_RADIUS = 1.5
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

  // TV warm-up effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 1000)
    return () => clearTimeout(timer)
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
    const maxWords = isMobile ? 8 : 25

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
          const colorIndex = Math.floor(Math.random() * DARK_THEME_COLORS.length)
          placements.push({ word, col, row, colorIndex })
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
  }, [dimensions])

  // Initialize and update dots
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const cols = Math.ceil(dimensions.width / DOT_SPACING)
    const rows = Math.ceil(dimensions.height / DOT_SPACING)

    const baseColor = theme === 'light' ? '0, 0, 0' : '255, 255, 255'
    const bgOpacity = theme === 'light' ? 0.06 : 0.15

    // Initialize dots if needed
    if (dotsRef.current.length !== cols * rows) {
      dotsRef.current = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dotsRef.current.push({
            x: x * DOT_SPACING + DOT_SPACING / 2,
            y: y * DOT_SPACING + DOT_SPACING / 2,
            targetOpacity: bgOpacity,
            currentOpacity: bgOpacity,
            color: baseColor,
            targetColor: baseColor,
          })
        }
      }
    }

    // Reset all dots to background opacity and base color
    // Use lower opacity for light theme background dots
    for (const dot of dotsRef.current) {
      dot.targetOpacity = bgOpacity
      dot.targetColor = baseColor
    }

    // Apply all word patterns with their colors
    const colors = theme === 'light' ? LIGHT_THEME_COLORS : DARK_THEME_COLORS
    for (const placement of wordPlacements) {
      const textPattern = getTextPattern(placement.word)
      const color = colors[placement.colorIndex]

      for (let textRow = 0; textRow < CHAR_HEIGHT; textRow++) {
        for (let textCol = 0; textCol < textPattern[0].length; textCol++) {
          if (textPattern[textRow][textCol]) {
            const col = placement.col + textCol
            const row = placement.row + textRow
            const idx = row * cols + col

            if (idx >= 0 && idx < dotsRef.current.length) {
              dotsRef.current[idx].targetOpacity = 0.95
              dotsRef.current[idx].targetColor = color
            }
          }
        }
      }
    }
  }, [dimensions, wordPlacements, getTextPattern, theme])

  // Regenerate placements periodically (after initialization)
  useEffect(() => {
    if (dimensions.width === 0 || isInitializing) return

    // Initial placement after warm-up
    setWordPlacements(generatePlacements())

    const interval = setInterval(() => {
      setWordPlacements(generatePlacements())
    }, 5000)

    return () => clearInterval(interval)
  }, [dimensions, generatePlacements, isInitializing])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize static noise and color arrays
    if (staticNoiseRef.current.length !== dotsRef.current.length) {
      staticNoiseRef.current = dotsRef.current.map(() => Math.random())
      staticColorIndicesRef.current = dotsRef.current.map(() => Math.floor(Math.random() * 6))
    }

    let lastFrameTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS
    let isVisible = true

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate)

      // Skip if tab is not visible
      if (!isVisible) return

      // Throttle to target FPS
      const elapsed = currentTime - lastFrameTime
      if (elapsed < frameInterval) return
      lastFrameTime = currentTime - (elapsed % frameInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update transition progress
      if (isInitializing) {
        transitionProgressRef.current = 0
      } else {
        transitionProgressRef.current = Math.min(1, transitionProgressRef.current + 0.02)
      }

      const transition = transitionProgressRef.current

      const colors = theme === 'light' ? LIGHT_THEME_COLORS : DARK_THEME_COLORS

      // Cache time once per frame instead of per dot
      const now = currentTime

      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i]

        // Calculate static noise opacity (fades out during transition)
        staticNoiseRef.current[i] += (Math.random() - 0.5) * 0.3
        staticNoiseRef.current[i] = Math.max(0, Math.min(1, staticNoiseRef.current[i]))
        const noiseOpacity = staticNoiseRef.current[i] * 0.95

        // Scanline effect - use cached time
        const scanlinePhase = (now / 50 + dot.y) % 100
        const scanlineBoost = scanlinePhase < 20 ? 0.2 : 0
        const staticOpacity = Math.min(0.95, noiseOpacity + scanlineBoost) * (1 - transition)

        // Use pre-computed random color for static effect (avoids Math.random per frame)
        const staticColor = colors[staticColorIndicesRef.current[i]]

        // Calculate normal dot opacity (fades in during transition)
        const diff = dot.targetOpacity - dot.currentOpacity
        dot.currentOpacity += diff * 0.08
        dot.color = dot.targetColor
        const normalOpacity = dot.currentOpacity * transition

        // Blend between static and normal
        const finalOpacity = staticOpacity + normalOpacity

        // Skip shadow for performance - only apply to high opacity dots
        if (normalOpacity > 0.4) {
          ctx.shadowBlur = 12 * transition
          ctx.shadowColor = `rgba(${dot.color}, ${normalOpacity * 0.8})`
        } else {
          ctx.shadowBlur = 0
        }

        // Use static color during init, word color after
        const finalColor = transition > 0.5 ? dot.color : staticColor

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${finalColor}, ${finalOpacity})`
        ctx.fill()
      }

      // Reset shadow
      ctx.shadowBlur = 0
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, dimensions, isInitializing])

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

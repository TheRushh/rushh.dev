# rushh.dev

A modern, performant portfolio website built with React, TypeScript, and cutting-edge web technologies. Features smooth animations, theme switching, and an interactive user experience.

## 📊 Code Quality

![Quality Score](https://img.shields.io/badge/Quality_Score-99.1%2F100-brightgreen?style=for-the-badge)
![Test Coverage](https://img.shields.io/badge/Coverage-96.4%25-brightgreen?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-100_passing-brightgreen?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)

## 🛠️ Tech Stack

![Portfolio Preview](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Tech Stack

### Core Framework

- **React 19.2.0** - Latest React with improved performance and new features
- **TypeScript 5.9.3** - Type-safe development with strict type checking
- **Vite 7.2.2** - Lightning-fast build tool with HMR (Hot Module Replacement)

### Styling & UI

- **Tailwind CSS 3.4.18** - Utility-first CSS framework for rapid UI development
- **DaisyUI 5.5.0** - Component library built on Tailwind CSS with custom theme system
- **Framer Motion 12.23.24** - Production-ready animation library for React
- **PostCSS 8.5.6** - CSS transformation tool with Autoprefixer

### Development Tools

- **ESLint 9.39.1** - Code linting with React-specific rules
- **TypeScript ESLint 8.46.3** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - Enforces rules of hooks

### Testing Tools

- **Vitest 4.0.8** - Fast unit test framework powered by Vite
- **React Testing Library 16.3.0** - Testing utilities for React components
- **Happy-DOM 20.0.10** - Lightweight DOM implementation for testing
- **@testing-library/jest-dom 6.9.1** - Custom matchers for DOM testing
- **@testing-library/user-event 14.6.1** - User interaction simulation

## ✨ Features

### 🎨 Design & UX

- **Dual Theme System** - Seamless light/dark mode switching with smooth transitions
- **Custom Color Palette** - Carefully crafted color schemes for both themes
- **Responsive Design** - Mobile-first approach with breakpoints for all screen sizes
- **Smooth Animations** - Framer Motion animations for enhanced user experience
- **Interactive Elements** - Hover effects, mouse follower spotlight, and 3D card transforms

### 🎯 Interactive Components

- **Mouse Follower Spotlight** - Dynamic radial gradient that follows cursor with `requestAnimationFrame` optimization
- **Animated Dot Grid Background** - Theme-aware background with gradient fade from top to bottom
- **3D Card Effects** - Interactive project cards with perspective transforms
- **Expandable Experience Timeline** - Collapsible timeline with smooth reveal animations
- **Scroll Edge Indicator** - Visual feedback for scrollable content

### ⚡ Performance Optimizations

- **RequestAnimationFrame** - Smooth 60fps animations for mouse follower
- **CSS Transitions** - Hardware-accelerated transitions for theme switching
- **Code Splitting** - Optimized bundle size with Vite's automatic code splitting
- **Direct DOM Manipulation** - Strategic use of refs to avoid unnecessary re-renders
- **Theme Detection** - MutationObserver for efficient theme change detection

### 🛠️ Technical Highlights

- **Type Safety** - Comprehensive TypeScript types throughout the application
- **Component Architecture** - Modular, reusable components with clear separation of concerns
- **Context API** - Global theme state management
- **Custom Utility Functions** - `cn()` utility for conditional className merging
- **SVG Favicon** - Programmatically generated favicon with initials

## 📁 Project Structure

```
rushh.dev/
├── public/
│   ├── images/              # Static images and assets
│   ├── favicon.svg          # SVG favicon with initials
│   ├── robots.txt           # SEO robots configuration
│   └── sitemap.xml          # Site structure for search engines
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI primitives
│   │   │   ├── BackgroundGrid.tsx
│   │   │   ├── Card3D.tsx
│   │   │   ├── Card3D.test.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   └── TextGenerateEffect.tsx
│   │   ├── CodeBackground.tsx
│   │   ├── DotGridBackground.tsx    # Animated dot grid
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Header.test.tsx
│   │   ├── MouseFollower.tsx        # Cursor spotlight effect
│   │   ├── ScrollEdgeIndicator.tsx
│   │   ├── ThemeDebug.tsx           # Development theme debugging
│   │   ├── ThemeSwitcher.tsx        # Theme toggle component
│   │   └── ThemeSwitcher.test.tsx
│   ├── sections/           # Page sections
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Contact.test.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx           # Timeline with expandable items
│   │   ├── Hero.tsx                 # Landing section
│   │   ├── Projects.tsx
│   │   └── Projects.test.tsx
│   ├── contexts/           # React Context providers
│   │   ├── ThemeContext.tsx         # Theme state management
│   │   └── ThemeContext.test.tsx
│   ├── utils/              # Utility functions
│   │   ├── cn.ts                    # ClassNames utility (clsx + tailwind-merge)
│   │   └── cn.test.ts
│   ├── test/               # Test configuration
│   │   └── setup.ts                 # Vitest setup file
│   ├── App.tsx             # Main application component
│   ├── App.css             # App-specific styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and custom CSS
├── index.html              # HTML entry point with theme script
├── tailwind.config.js      # Tailwind and DaisyUI configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # App-specific TS config
├── tsconfig.node.json      # Node-specific TS config
├── vite.config.ts          # Vite build & test configuration
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Color Palette

#### Dark Theme

```javascript
{
  primary: "#3b82f6",      // Blue
  secondary: "#8b5cf6",    // Purple
  accent: "#06b6d4",       // Cyan
  base-100: "#0f172a",     // Slate 900
  base-200: "#1e293b",     // Slate 800
  base-300: "#334155",     // Slate 700
}
```

#### Light Theme

```javascript
{
  primary: "#2563eb",      // Blue
  secondary: "#7c3aed",    // Purple
  accent: "#0891b2",       // Cyan
  base-100: "#ffffff",     // White
  base-200: "#f8fafc",     // Slate 50
  base-300: "#e2e8f0",     // Slate 200
}
```

### Typography

- **Primary Font**: Inter - Clean, modern sans-serif
- **Monospace Font**: MesloLGS NF - For code and technical elements
- **Font Smoothing**: Antialiased on all platforms

### Animations

- **Fade In**: 0.5s ease-out opacity transition
- **Slide Up**: 0.5s ease-out with Y-transform
- **Theme Transition**: 0.3s ease for backgrounds and borders
- **Framer Motion**: Custom spring animations for interactive elements

## 🔧 Technical Implementation

### Theme System

The theme system uses DaisyUI's `data-theme` attribute combined with React Context and MutationObserver for real-time theme detection:

```typescript
// Theme persistence in localStorage
const savedTheme = localStorage.getItem('theme') || 'dark'
document.documentElement.setAttribute('data-theme', savedTheme)

// MutationObserver for dynamic theme detection
const observer = new MutationObserver(() => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  setTheme(currentTheme)
})
```

### Performance Optimizations

#### Mouse Follower

Uses `requestAnimationFrame` for 60fps smooth tracking:

```typescript
const handleMouseMove = (e: MouseEvent) => {
  cancelAnimationFrame(animationFrameId)
  animationFrameId = requestAnimationFrame(() => {
    spotlightRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, ...)`
  })
}
```

#### Transition Strategy

- **Instant**: Text color changes (prevents stutter)
- **Smooth (0.3s)**: Backgrounds, borders, fills, strokes
- **Hardware Accelerated**: Uses CSS transforms where possible

### Dot Grid Background

Dynamic background that:

- Detects theme changes via MutationObserver
- Renders different dot colors for light/dark modes
- Uses linear gradient mask for fade effect from top to bottom
- Extends to full viewport height while maintaining visibility

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/TheRushh/rushh.dev.git
cd rushh.dev
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Code Quality & Linting
npm run lint              # Check for linting errors
npm run lint:fix          # Auto-fix linting issues
npm run format            # Format all files with Prettier
npm run format:check      # Check code formatting

# Testing
npm test                  # Run all tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Run tests with coverage report

# Quality Checks
npm run quality           # Run comprehensive quality check (interactive)
npm run quality:report    # Generate JSON quality report (CI/CD)
```

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:

- Minified JavaScript and CSS
- Tree-shaken dependencies
- Optimized assets
- Source maps for debugging

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── index-[hash].css     # Compiled styles
│   └── [images]             # Optimized images
└── index.html               # Entry HTML
```

### Project Structure

```
rushh.dev/
├── .github/
│   └── workflows/
│       └── quality-check.yml       # CI/CD quality checks workflow
├── .husky/
│   └── pre-commit                  # Git pre-commit hooks
├── public/
│   ├── images/
│   │   └── profile.jpg             # Profile image
│   ├── favicon.ico                 # Favicon files
│   ├── logo.png                    # Logo for SEO
│   ├── sitemap.xml                 # Sitemap for SEO
│   └── robots.txt                  # Robots file
├── scripts/
│   ├── quality-check.js            # Interactive quality check script
│   └── quality-report.js           # CI/CD quality report generator
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BackgroundGrid.tsx  # Animated grid background
│   │   │   ├── Card3D.tsx          # 3D card with mouse tracking
│   │   │   ├── Spotlight.tsx       # Spotlight effect
│   │   │   └── TextGenerateEffect.tsx # Text animation effect
│   │   ├── CodeBackground.tsx      # Code-themed background
│   │   ├── DotGridBackground.tsx   # Dot grid background
│   │   ├── Footer.tsx              # Footer component
│   │   ├── Header.tsx              # Navigation header
│   │   ├── MouseFollower.tsx       # Mouse follower spotlight
│   │   ├── ScrollEdgeIndicator.tsx # Scroll indicators
│   │   ├── ThemeDebug.tsx          # Theme debugging tool
│   │   └── ThemeSwitcher.tsx       # Theme toggle button
│   ├── contexts/
│   │   ├── ThemeContext.context.ts # Theme context definition
│   │   └── ThemeContext.tsx        # Theme provider component
│   ├── data/
│   │   ├── education.ts            # Education data
│   │   ├── experience.ts           # Work experience data
│   │   ├── icons.ts                # Technology icons mapping
│   │   ├── index.ts                # Data exports
│   │   ├── projects.ts             # Projects data
│   │   ├── skills.ts               # Skills data
│   │   └── types.ts                # TypeScript types
│   ├── hooks/
│   │   └── useTheme.ts             # Custom theme hook
│   ├── sections/
│   │   ├── About.tsx               # About section
│   │   ├── Contact.tsx             # Contact section
│   │   ├── Education.tsx           # Education section
│   │   ├── Experience.tsx          # Experience timeline
│   │   ├── Hero.tsx                # Hero section
│   │   └── Projects.tsx            # Projects showcase
│   ├── test/
│   │   └── setup.ts                # Vitest setup
│   ├── utils/
│   │   └── cn.ts                   # Tailwind class merger utility
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── .eslintrc.js                    # ESLint configuration
├── .lintstagedrc.json              # Lint-staged configuration
├── .prettierrc                     # Prettier configuration
├── .prettierignore                 # Prettier ignore patterns
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.ts                  # Vite configuration
└── vitest.config.ts                # Vitest configuration
```

### Deployment

The project can be deployed to any static hosting service:

- **Vercel** - Zero-config deployment (current deployment)
- **Netlify** - Continuous deployment from Git
- **GitHub Pages** - Free hosting for public repos
- **Cloudflare Pages** - Fast edge deployment

## 🎯 Key Features Breakdown

### Hero Section

- Animated profile image with shadow and glow effects
- Theme-aware dark overlay (20% opacity in dark mode)
- Smooth hover animations with scale transforms
- Responsive grid layout for mobile/desktop

### Experience Timeline

- Expandable/collapsible experience items
- Role descriptions with detailed responsibilities
- Smooth AnimatePresence transitions
- Responsive design with mobile-first approach
- Visual timeline connector on desktop

### Projects Section

- 3D card transforms on hover
- Technology tag pills
- External links to GitHub and live demos
- Responsive grid with auto-fit columns

### Contact Section

- Social media links
- Email contact
- Animated section transitions
- Responsive layout

## 🔍 Code Quality

### Quality Score: 99.1/100

Our codebase maintains exceptional quality standards with automated checks and comprehensive testing:

- ✅ **TypeScript**: 100% - Strict type checking, no implicit any
- ✅ **ESLint**: 100% - All linting rules passing
- ✅ **Prettier**: 100% - Consistent code formatting
- ✅ **Test Coverage**: 96.4% - Comprehensive test suite

### Testing Infrastructure

- **Vitest 4.0.8** - Lightning-fast unit test framework powered by Vite
- **React Testing Library 16.3.0** - User-centric testing utilities
- **Happy-DOM** - Fast DOM environment (51% faster than jsdom)
- **100 tests** covering all critical components and utilities
- **Coverage Thresholds**: 80% minimum for lines, statements, functions, and branches

#### Test Coverage Breakdown

```
Lines:      98.5% ████████████████████
Statements: 97.0% ███████████████████
Functions:  95.5% ██████████████████
Branches:   94.4% ██████████████████
```

**Coverage includes:**

- UI components (Header, ThemeSwitcher, Card3D)
- Page sections (Projects, Contact)
- Context providers (ThemeContext)
- Custom hooks (useTheme)
- Utility functions (cn)
- Accessibility testing
- User interaction testing

### Code Quality Tools

#### Prettier

Enforces consistent code formatting across the entire codebase:

- Semi-colons: Off
- Single quotes: Yes
- Tab width: 2 spaces
- Print width: 100 characters
- Arrow parens: Avoid

#### ESLint

Comprehensive linting with strict rules:

- React Hooks rules enforcement
- React Refresh fast-refresh compliance
- TypeScript-specific linting
- Prettier integration for style consistency
- No suppressions or bypasses allowed

#### TypeScript

- Strict mode enabled
- No implicit any
- Comprehensive type definitions
- Interface-first design
- Separated concerns (context, hooks, components)

### Git Hooks (Husky + lint-staged)

Automated quality checks run on every commit:

```bash
# Pre-commit hook automatically:
✓ Formats code with Prettier
✓ Fixes ESLint issues
✓ Runs related tests
✓ Blocks commit if checks fail
```

### CI/CD Quality Checks

GitHub Actions workflow runs on every PR:

- ✅ TypeScript compilation check
- ✅ ESLint validation
- ✅ Prettier formatting verification
- ✅ Full test suite execution
- ✅ Coverage threshold validation (80%)
- 📊 Automated quality report posted as PR comment

### Quality Scripts

```bash
# Interactive quality check with detailed scoring
npm run quality

# Generate JSON report for CI/CD
npm run quality:report
```

The quality check script provides:

- Real-time TypeScript compilation check
- ESLint error/warning count
- Prettier formatting status
- Test coverage metrics
- Overall quality score (0-100)
- Color-coded output with pass/fail indicators

### Best Practices

- ✅ Component composition over inheritance
- ✅ Custom hooks for reusable logic
- ✅ Separation of concerns (contexts, hooks, components)
- ✅ Accessibility considerations (ARIA labels, semantic HTML)
- ✅ Performance optimization patterns
- ✅ Test-driven development approach
- ✅ No code suppressions or linting bypasses

## 📊 Performance Metrics

- **First Contentful Paint**: ~0.8s
- **Time to Interactive**: ~1.2s
- **Bundle Size**: ~150KB (gzipped)
- **Lighthouse Score**: 95+

## 🤝 Contributing

This is a personal portfolio project. While contributions are not actively sought, feel free to fork and adapt for your own use.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rushabh Vakharwala**

- GitHub: [@TheRushh](https://github.com/therushh)
- LinkedIn: [rushabhv](https://linkedin.com/in/rushabhv)
- Website: [rushh.dev](https://rushh.dev)

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) - For amazing animation primitives
- [DaisyUI](https://daisyui.com/) - For beautiful Tailwind components
- [Lucide Icons](https://lucide.dev/) - For clean, minimal icons
- [Vite](https://vitejs.dev/) - For lightning-fast development experience

---

Built with ❤️ using React, TypeScript, and modern web technologies.

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

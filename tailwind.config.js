import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#06b6d4',
          neutral: '#1f2937',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          info: '#0ea5e9',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
      {
        light: {
          primary: '#2563eb',
          secondary: '#7c3aed',
          accent: '#0891b2',
          neutral: '#64748b',
          'base-100': '#ffffff',
          'base-200': '#f8fafc',
          'base-300': '#e2e8f0',
          info: '#0284c7',
          success: '#16a34a',
          warning: '#d97706',
          error: '#dc2626',
        },
      },
    ],
  },
}

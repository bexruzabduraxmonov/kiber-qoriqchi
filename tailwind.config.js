/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d151c',
        surface: '#1a232c',
        'surface-alt': '#24303c',
        border: '#2d3d4f',
        primary: {
          DEFAULT: '#88cc14',
          hover: '#75b310',
        },
        'accent-cyan': '#0ea5e9',
        'accent-amber': '#f59e0b',
        'accent-red': '#ef4444',
      },
      fontFamily: {
        heading: ['Ubuntu', 'sans-serif'],
        body: ['Ubuntu', 'sans-serif'],
        mono: ['"Ubuntu Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}

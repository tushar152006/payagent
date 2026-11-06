/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF9F5',
        stone: {
          50: '#FDFCF9',
          100: '#FAF9F5',
          200: '#F1EFEA',
          300: '#E4DFD5',
          400: '#C8C1B4',
          500: '#8C8275',
          600: '#5F574D',
          700: '#433D35',
          800: '#2A2723',
          900: '#141413'
        },
        paypal: {
          blue: '#0070BA',
          dark: '#003087',
          light: '#00CFDE',
          bg: '#EBF4FA'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'SF Mono', 'ui-monospace', 'monospace']
      }
    },
  },
  plugins: [],
}

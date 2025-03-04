/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      colors: {
        'terminal-black': '#0d1117',
        'terminal-green': {
          100: '#b3ffb3',
          200: '#99ff99',
          300: '#80ff80',
          400: '#66ff66',
          500: '#4dff4d',
          600: '#33ff33',
          700: '#1aff1a',
          800: '#00ff00',
          900: '#00e600',
        },
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
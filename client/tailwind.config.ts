/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f9',
          100: '#b3e6ec',
          200: '#80d5df',
          300: '#4dc4d2',
          400: '#32b8c6',
          500: '#2a9fac',
          600: '#228692',
          700: '#1a6d78',
          800: '#12545e',
          900: '#0a3b44',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

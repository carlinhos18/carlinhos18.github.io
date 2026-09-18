/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          text: '#e0e0e0',
          accent: '#0ea5e9'
        },
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b',
          accent: '#0284c7'
        }
      }
    },
  },
  plugins: [],
}

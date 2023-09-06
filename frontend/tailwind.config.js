/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#44a03e",
        secondary: "#d0d2af"
      },
      fontFamily: {
        primary: ['Roboto Mono', 'monospace'],
        secondary: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}


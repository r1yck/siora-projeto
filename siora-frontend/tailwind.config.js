/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        siora: {
          teal: '#0F766E', 
          blue: '#2563EB', 
          dark: '#0F172A', 
        }
      }
    },
  },
  plugins: [],
}
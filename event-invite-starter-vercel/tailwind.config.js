
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#0f2f26',
        mint: '#b1f0da',
        gold: '#F6CF72'
      },
      fontFamily: {
        display: ['"League Spartan"', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}

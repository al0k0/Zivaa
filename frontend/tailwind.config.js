/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zivaa: {
          primary: '#6F577D',     // Plum
          accent: '#EC0B43',      // Crimson Red
          dark: '#1F1F1F',        // Charcoal background
          light: '#FAFAFA',       // Soft white bg
          text: '#2E2E2E',        // Gunmetal text
          secondaryText: '#6B7280', // Subtle text
          lavender: '#CBAACB',    // Highlight
          border: '#E5E7EB'       // Input/border
        }
      },
    fontFamily: {
      serif: ['"Marcellus", serif'], // Add your font here
      body: ['Jost', 'Roboto', 'sans-serif'],
      

    },
  }
  },
  plugins: [],
}
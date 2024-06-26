/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#3954E4',
        'blue-dark': '#3A4DB5',
        'red': '#F53D3D',
        'yellow': '#FFB649',
        'text-white': '#FFFFFF',
        'text-dark': '#2B2B2B',
        'text-secondary': '#D9D9D9',
      }
    },
  },
  plugins: [],
}


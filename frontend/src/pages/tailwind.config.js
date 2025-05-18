/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        custom: 'Inter, sans-serif'
      },
      colors: {
        'custom-purp': '#484A77',
        'custom-gray': '#242927'
      }
    },
  },
  plugins: [],
}


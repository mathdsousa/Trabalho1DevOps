/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".frontend/src/pages/**/*.{html,js,jsx}"],
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
fnm
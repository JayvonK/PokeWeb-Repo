/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./dist/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}


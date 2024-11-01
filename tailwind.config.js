/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#544b8f',
        'purple-light': '#e5e2f5',
        'bg-base': '#f5f3fa',
      }
    },
  },
  plugins: [],
}


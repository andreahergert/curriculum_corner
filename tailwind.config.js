 //@type {import('tailwindcss').Config} 
module.exports = {
  content: [
    './componenets/**/*.{html, js}',
    './pages/**/*.{html, js}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iqoo: {
          yellow: '#FFE600',
          orange: '#FF5722',
          black: '#0D0D0E',
          card: '#161719',
          border: '#24262A',
          muted: '#8A8D93'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
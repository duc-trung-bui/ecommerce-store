/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        Jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        'hot-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        }
      },
      animation: {
        'hot-bounce': 'hot-bounce 0.6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}


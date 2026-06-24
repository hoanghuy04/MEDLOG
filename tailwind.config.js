/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vtosReady: '#10B981',
        vtosFault: '#EF4444',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lakers: {
          purple: '#552583',
          gold: '#FDB927',
          black: '#0A0A0B',
        },
      },
    },
  },
  plugins: [],
}


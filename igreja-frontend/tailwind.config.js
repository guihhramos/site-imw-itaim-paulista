/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas para o seu sistema da igreja
        'igreja-blue': '#1e3a8a',
        'admin-dark': '#111827',
      },
    },
  },
  plugins: [],
}
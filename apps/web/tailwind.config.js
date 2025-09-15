/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",      // legacy pages/ support
    "./app/**/*.{js,jsx,ts,tsx}",        // Next.js app router
    "../../packages/ui/**/*.{js,jsx,ts,tsx}", // shared UI
  ],
  theme: { extend: {} },
  plugins: [],
};

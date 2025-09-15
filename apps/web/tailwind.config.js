const baseConfig = require("../../tailwind.config.js");

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [baseConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

module.exports = config;   // ✅ CommonJS (local)
export default config;     // ✅ ESM (Vercel)

/** @type {import('tailwindcss').Config} */
const baseConfig = require("../../tailwind.config.js");

module.exports = {
  presets: [baseConfig], // 👈 inherit root config
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

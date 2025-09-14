/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  // remove plugin line
  // plugins: [require("nativewind/tailwind/css")],
  important: "html", // keep this for style precedence
  theme: { extend: {} },
};

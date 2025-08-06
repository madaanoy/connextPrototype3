/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",        // App.tsx, index.tsx, and anything else in app/
    "./components/**/*.{js,jsx,ts,tsx}", // Keep this if components are still in the components folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
    },
  },
  plugins: [],
};

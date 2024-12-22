import { colors } from "./src/constants/colors";
import { fontFamily } from "./src/constants/fonts";

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: { 
      colors: colors,
      fontFamily: fontFamily
    },
  },
  plugins: [],
}
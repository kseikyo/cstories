// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // if needed to setup a theme
        // accent: "rgb(var(--accent) / <alpha-value>)",
        // background: "rgb(var(--background) / <alpha-value>)",
        // content: "rgb(var(--content) / <alpha-value>)",
        // foreground: "rgb(var(--foreground) / <alpha-value>)",
        // edge: "rgb(var(--edge) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/forms")],
};

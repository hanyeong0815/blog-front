/** @type {import('tailwindcss').Config} */
const defaultColors = require("tailwindcss/colors");
const defaultDropShadows = require("tailwindcss/defaultTheme").dropShadow;

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#333",
        "main-contra": "#FEFEFE",
        sub: "#000000",
        "sub-contra": "#FFFFFF",

        // example of custom palette
        cart: "#9FC131",
        "cart-contra": "#FFFFFF",
        bell: "#FFD700",
        "bell-off": "#d3d3d3",
        ontable: "#8B4513",
        "ontable-contra": "#ffffff",
        onplace: "#4B0082",
        "onplace-contra": "#ffffff",

        // general palette
        basic: "#F0F0F0",
        "basic-active": "#F0F0F0",
        "basic-contra": "#000000",
        default: "#d4d4d4",
        "default-active": "#e6e6e6",
        "default-contra": "#131313",
        primary: "#1266F1",
        "primary-active": "#0c56d0",
        "primary-contra": "#FFFFFF",
        secondary: "#B23CFD",
        "secondary-active": "#a316fd",
        "secondary-contra": "#FFFFFF",
        success: "#00B74A",
        "success-active": "#00913b",
        "success-contra": "#FFFFFF",
        info: "#39C0ED",
        "info-active": "#16b5ea",
        "info-contra": "#ffffff",
        warning: "#FFA900",
        "warning-active": "#d99000",
        "warning-contra": "#ffffff",
        danger: "#F93154",
        "danger-active": "#f80c35",
        "danger-contra": "#ffffff",
        link: "transparent",
        "link-active": "transparent",
        "link-contra": "#39C0ED",
        light: "#FBFBFB",
        "light-active": "#e6e6e6",
        "light-contra": "#262626",
        dark: "#262626",
        "dark-active": "#131313",
        "dark-contra": "#FBFBFB",

        ...defaultColors,
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      jm: { max: "424px" },
    },
    dropShadow: {
      ...defaultDropShadows,
      "t-sm": "0 -1px 1px rgb(0 0 0 / 0.05)",
      t: ["0 -1px 2px rgb(0 0 0 / 0.1)", "0 -1px 1px rgb(0 0 0 / 0.06)"],
      "t-md": ["0 -4px 3px rgb(0 0 0 / 0.07)", "0 -2px 2px rgb(0 0 0 / 0.06)"],
      "t-lg": ["0 -10px 8px rgb(0 0 0 / 0.04)", "0 -4px 3px rgb(0 0 0 / 0.1)"],
      "t-xl": [
        "0 -20px 13px rgb(0 0 0 / 0.03)",
        "0 -8px 5px rgb(0 0 0 / 0.08)",
      ],
      "t-2xl": "0 -25px 25px rgb(0 0 0 / 0.15)",
      "t-inner": "inset 0 7px 9px -7px rgba(0,0,0,0.4)",
    },
  },
  plugins: [],
};

const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        start: "start 0.5s forwards",
      },
      colors: {
        primary: "#13006C",
        primary2: "#444CF7",
        primaryLight: "#97a8bc",
        secundary: "#d3662e",
        secundaryLight: "#bba691",
        secundaryLight_X: "#ded5cc",
        grayLight: "#e9ebea",
        grayDark: "#9f9f9f",
        red: "#fe0000",
        white: "#fefefe",
        success: "#39bd02", //Verde V2
        successLight: "#a8e58f", //Verde pastel
        verify: "#00F700", //Verde pastel
        error: "#ff0000", //Rojo
        warning: "#ff6e01", //Naranja
        yellow: "#F7BD01", //amarillo
        skyBlue: "#78D3F1", //celeste
      },
    },
    screens: {
      x: "320px",
      // => @media (min-width: 320px) { ... }
      xxs: "390px",
      // => @media (min-width: 390px) { ... }
      xs: "480px",
      // => @media (min-width: 480px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }
      ml: "820",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "1xl": "1336px",
      // => @media (min-width: 1536px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    variants: {
      // ...
      backgroundColor: ["focus", "hover"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
/* redLight: #fc4537; */
/* grayLight: #e9ebea; */
/* grayDark: #9f9f9f; */
/* blue: #3d56ee; */
/* red: #fe0000; */

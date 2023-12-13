/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#354b72",
        primaryLight: "#97a8bc",
        secundary: "#d3662e",
        secundaryLight: "#bba691",
        secundaryLight_X: "#ded5cc",
        grayLight: "#e9ebea",
        grayDark: "#9f9f9f",
        red: "#fe0000",
      },
    },
  },
  plugins: [],
};
/* redLight: #fc4537; */
/* grayLight: #e9ebea; */
/* grayDark: #9f9f9f; */
/* blue: #3d56ee; */
/* red: #fe0000; */

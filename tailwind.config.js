/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "myColor": "#00f428",
        "bgColor": "rgb(255, 233, 159)",
        "bgTrans": "rgba(196, 196, 196, 0.444)",
        "blColorStart": "rgb(0, 0, 255)",
        "blColorEnd": "rgba(77, 82, 158, 0.87)",
        "gray": "#5f5f5f",
        "borderTable": "rgba(0, 0, 0, 0.205)",
        "bgTable": "rgb(255, 249, 237)",
        "colorTable": "rgb(95, 95, 95)",
        "selectValue": "#ecdd89da",
        "selectLigCol": "rgba(236, 221, 137, 0.575)",
        "bgHover": "rgba(116, 116, 116, 0.164)",
        "userInput": "rgba(55, 55, 214, 0.849)",
        "wrongInput": "rgb(255,0,0)",
        "pauseGame": "rgb(253, 245, 222)",
        "secondLuck": "rgba(41, 41, 41, 0.692)",
        "bgSecondLuck": "rgb(255, 255, 255)"
      },
      screens: {
        "ps": "350px",
        "2xs": "100px",
        "dis": { "max": "350px" },
        "dis2": { "min": "450px" },
      }
    },
  },
  plugins: [],
}


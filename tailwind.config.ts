/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      red: "#FF2E00",
      orange: "#F81",
      "pastel-orange": "#FFCC70",
      peach: "#FFFADD",
      green: "#63A54B",
      "ocean-blue": "#22668D",
      "sky-blue": "#8ECDDD",
      black: "#000",
      "orange-black": "#322F2D",
      "dark-gray": "#919EA8",
      "light-gray": "#E3E3E0",
      gray: "#E7E3C7",
      white: "#FFF",
    },
    fontFamily: {
      serif: ["Young Serif", "Chonburi", "serif"],
      "sans-serif": ["Gabarito", "IBM Plex Sans Thai Looped", "sans-serif"],
    },
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
      zIndex: {
        "-1": "-1",
        1: "1",
      },
      height: {
        dscreen: ["100vh", "100dvh"],
      },
    },
  },
  plugins: [],
};

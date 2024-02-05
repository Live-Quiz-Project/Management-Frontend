/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // color named by https://chir.ag/projects/name-that-color
      current: "currentColor",
      transparent: "transparent",
      scarlet: "#FF2E00",
      sienna: "#F27F60",
      koromiko: "#FFBB60",
      karry: "#ffe6d0",
      "egg-sour": "#FFF2DD",
      apple: "#63A54B",
      denim: "#1068bb",
      "jordy-blue": "#9CBDF5",
      quartz: "#dde6f6",
      black: "#000",
      dune: "#322F2D",
      "regent-gray": "#919EA8",
      "quill-gray": "#E3E3E0",
      beige: "#faf7ee",
      white: "#FFF",
    },
    fontFamily: {
      serif: ["Young Serif", "Chonburi", "serif"],
      "sans-serif": ["Gabarito", "IBM Plex Sans Thai Looped", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "400px",
      },
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
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-17": "span 17 / span 17",
        "span-24": "span 24 / span 24",
      },
      gridColumnStart: {
        16: "16",
        24: "24",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        60: "repeat(60, minmax(0, 1fr))",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-12": "span 12 / span 12",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-18": "span 18 / span 18",
        "span-20": "span 20 / span 20",
        "span-30": "span 30 / span 30",
        "span-60": "span 60 / span 60",
      },
      gridRowStart: {
        7: "7",
      },
    },
  },
  plugins: [],
};

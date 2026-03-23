/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        galmuri: ["Galmuri9"],
        pretendard: ["Pretendard-Regular"],
        Tenada: ["Tenada"],
        GmarketSansMedium: ["GmarketSansMedium"],
      },
      padding: {
        "3px": "3px",
        "12px": "12px",
        "16px": "16px",
      },
    },
    colors: {
      normal: "#949495",
      fighting: "#E09C40",
      flying: "#A2C3E7",
      poison: "#735198",
      ground: "#9C7743",
      rock: "#BFB889",
      bug: "#9FA244",
      ghost: "#684870",
      steel: "#69A9C7",
      fire: "#e56c3e",
      water: "#5185C5",
      grass: "#66A945",
      electric: "#F6D851",
      psychic: "#DD6B7B",
      ice: "#6DC8EB",
      dragon: "#535CA8",
      dark: "#4C4948",
      fairy: "#DAB4D4",
      unknown: "#d5ec6d",
      shadow: "#4b4f71",

      "gray-100": "#99B2B9",
    },
  },
  plugins: [],
};

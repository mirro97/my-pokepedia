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
      colors: {
        // 포켓몬 타입 색상
        "type-normal": "#949495",
        "type-fighting": "#E09C40",
        "type-flying": "#A2C3E7",
        "type-poison": "#735198",
        "type-ground": "#9C7743",
        "type-rock": "#BFB889",
        "type-bug": "#9FA244",
        "type-ghost": "#684870",
        "type-steel": "#69A9C7",
        "type-fire": "#e56c3e",
        "type-water": "#5185C5",
        "type-grass": "#66A945",
        "type-electric": "#F6D851",
        "type-psychic": "#DD6B7B",
        "type-ice": "#6DC8EB",
        "type-dragon": "#535CA8",
        "type-dark": "#4C4948",
        "type-fairy": "#DAB4D4",
        "type-unknown": "#d5ec6d",
        "type-shadow": "#4b4f71",

        // UI 시맨틱 색상
        brand: "#5A7C88",
        accent: "#e3695ce9",
        "accent-hover": "#e65e4fe9",
        muted: "#99B2B9",
        surface: "#e9ecee",
        "page-bg": "#f2f4f6",
        foreground: "#3a3939",
        "header-border": "#001b371a",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primaries
        laranja: "#FF6820",
        grafite: "#161616",
        neve: "#F5F6F1",
        // Brand secondaries
        vermelho: "#FF2048",
        azul: "#20B7FF",
        amarelo: "#FFD820",
        pessego: "#FFA479",
        "azul-escuro": "#2059FF",
        limao: "#B7FF20",
        verde: "#20FF68",
        roxo: "#6820FF",
        rosa: "#FF2099",
        vinho: "#7B1A4D",
        turquesa: "#20FFD8",
        marrom: "#55230B",
      },
      fontFamily: {
        display: ["var(--font-wix-display)", "sans-serif"],
        body: ["var(--font-wix-text)", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "sub": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3" }],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

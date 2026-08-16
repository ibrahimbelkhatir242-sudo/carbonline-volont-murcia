import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0B",
        carbon: "#18181A",
        panel: "#131314",
        steel: "#333335",
        "steel-light": "#4A4B4D",
        muted: "#8A8B8D",
        bone: "#F2F1EE",
        signal: "#C41E2E",
        "signal-dim": "#7A1319",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "carbon-weave":
          "repeating-linear-gradient(45deg, #1c1c1e 0px, #1c1c1e 2px, #161617 2px, #161617 4px), repeating-linear-gradient(-45deg, #1c1c1e 0px, #1c1c1e 2px, #161617 2px, #161617 4px)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        glowPulse: "glowPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

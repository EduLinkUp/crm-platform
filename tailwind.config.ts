import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem", // 72px
        20: "5rem", // 80px
      },
      colors: {
        // Cyberpunk colors
        neon: {
          yellow: "#FFFF00",
          red: "#FF0055",
          cyan: "#00FFFF",
          pink: "#FF00FF",
          purple: "#8B00FF",
          green: "#00FF00",
        },
        cyber: {
          dark: "#0a0e27",
          darker: "#050812",
          accent: "#1a1f3a",
          border: "#2a2f4a",
        },
        // Standard colors
        primary: "#FFFF00",
        secondary: "#FF0055",
      },
      backgroundColor: {
        cyber: "#0a0e27",
        "cyber-darker": "#050812",
        "cyber-accent": "#1a1f3a",
      },
      borderColor: {
        cyber: "#2a2f4a",
        neon: "#FFFF00",
      },
      textColor: {
        neon: "#FFFF00",
        "neon-red": "#FF0055",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 255, 0, 0.5)",
        "glow-red": "0 0 20px rgba(255, 0, 85, 0.5)",
        "glow-lg": "0 0 40px rgba(255, 255, 0, 0.8)",
        "glow-red-lg": "0 0 40px rgba(255, 0, 85, 0.8)",
        neon: "0 0 10px rgba(255, 255, 0, 0.3), 0 0 20px rgba(255, 0, 85, 0.3)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flicker: "flicker 3s ease-in-out infinite",
        scan: "scan 8s linear infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 255, 0, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 255, 0, 0.8)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            textShadow: "0 0 10px rgba(255, 255, 0, 0.8)",
          },
          "20%, 24%, 55%": {
            textShadow: "0 0 20px rgba(255, 255, 0, 0.4)",
          },
        },
        scan: {
          "0%": { top: "0" },
          "100%": { top: "100%" },
        },
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config

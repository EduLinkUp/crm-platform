import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette
        "neon-yellow": "#FFD700",
        "neon-red": "#FF0040",
        "neon-pink": "#FF1493",
        "cyber-black": "#0A0A0A",
        "cyber-gray": "#1A1A1A",
        "cyber-dark": "#0F0F0F",
        "neon-orange": "#FF6B35",
        "electric-blue": "#00D4FF",
        "matrix-green": "#00FF41",
        "warning-yellow": "#FFC107",
        "danger-red": "#DC3545",
        "success-green": "#28A745",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)",
        "neon-gradient": "linear-gradient(45deg, #FFD700, #FF0040, #FF1493)",
        "grid-pattern": "radial-gradient(circle at 1px 1px, #FFD700 1px, transparent 1px)",
      },
      boxShadow: {
        "neon-yellow": "0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FFD700",
        "neon-red": "0 0 20px #FF0040, 0 0 40px #FF0040, 0 0 60px #FF0040",
        "neon-pink": "0 0 20px #FF1493, 0 0 40px #FF1493, 0 0 60px #FF1493",
        "cyber-border": "0 0 0 1px #FFD700, inset 0 0 20px rgba(255, 215, 0, 0.1)",
      },
      animation: {
        "neon-pulse": "neonPulse 2s ease-in-out infinite alternate",
        "cyber-glow": "cyberGlow 3s ease-in-out infinite",
        "matrix-rain": "matrixRain 10s linear infinite",
        "neon-flicker": "neonFlicker 1.5s ease-in-out infinite",
      },
      keyframes: {
        neonPulse: {
          "0%": { textShadow: "0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700" },
          "100%": { textShadow: "0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 50px #FFD700" },
        },
        cyberGlow: {
          "0%": { boxShadow: "0 0 5px #FF0040, 0 0 10px #FF0040" },
          "50%": { boxShadow: "0 0 20px #FF0040, 0 0 30px #FF0040, 0 0 40px #FF0040" },
          "100%": { boxShadow: "0 0 5px #FF0040, 0 0 10px #FF0040" },
        },
        matrixRain: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        neonFlicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      fontFamily: {
        "cyber": ["Courier New", "monospace"],
        "neon": ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config

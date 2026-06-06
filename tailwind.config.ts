import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#020617",
          50: "#0a0f1f",
          100: "#0b1228",
          200: "#0d1632",
        },
        navy: {
          DEFAULT: "#0b1c3a",
          50: "#0f2347",
          100: "#142b58",
          200: "#1a356b",
          300: "#1f4079",
        },
        electric: {
          DEFAULT: "#22d3ee",
          50: "#67e8f9",
          100: "#22d3ee",
          200: "#06b6d4",
          300: "#0891b2",
          glow: "#60a5fa",
        },
        silver: {
          DEFAULT: "#cbd5e1",
          50: "#f1f5f9",
          100: "#e2e8f0",
          200: "#cbd5e1",
          300: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "Inter", "ui-sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(96,165,250,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.07) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(34,211,238,0.15) 0%, rgba(2,6,23,0) 70%)",
        "electric-gradient":
          "linear-gradient(135deg, #22d3ee 0%, #60a5fa 50%, #818cf8 100%)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "scan-line": "scanLine 4s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34,211,238,0.35)" },
          "50%": { boxShadow: "0 0 40px rgba(34,211,238,0.7)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(34,211,238,0.35)",
        "glow-strong": "0 0 60px rgba(34,211,238,0.55)",
        executive: "0 25px 50px -12px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;

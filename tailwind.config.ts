import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Locked palette
        ink: "#0b0b0d",
        "ink-soft": "#141417",
        coral: "#D85A30",
        teal: "#5DCAA5",
        violet: "#7F77DD",
        amber: "#EF9F27",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;

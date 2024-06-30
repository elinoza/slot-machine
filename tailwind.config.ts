import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "symbol-small": "120px",
        "symbol-medium": "190px",
        "frame-small": "250px",
        "frame-medium": "280px",
      },
      height: {
        "symbol-small": "70px",
        "symbol-medium": "90px",
        "frame-small": "200px",
        "frame-medium": "230px",
      },
      boxShadow: {
        metal:
          " 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2) inset;",
      },
      backgroundImage: {
        "circle-gradient":
          "radial-gradient(circle at 10px 20px, #ff0000, #363636)",
        "gold-gradient-horizontal":
          "linear-gradient(0deg, #B8860B, #FFD700, #B8860B);",
        "metal-gradient-vertical":
          "linear-gradient(90deg, #a9a9a9, #f5f5f5, #a9a9a9)",
        "metal-gradient-horizontal":
          "linear-gradient(0deg, #a9a9a9, #ffffff, #a9a9a9)",
        "body-gradient-horizontal":
          "linear-gradient(0deg, #e9e8e8, #ffffff, #e6e6e6)",
        "normal-metal": "linear-gradient(90deg, #a9a9a9, #f5f5f5, #a9a9a9);",
      },
      textColor: {
        gold: "linear-gradient(0deg, #B8860B, #FFD700, #B8860B)",
      },

      borderColor: {
        "metal-gradient-horizontal":
          "linear-gradient(0deg, #a9a9a9, #f5f5f5, #a9a9a9)",
      },
    },
  },
  plugins: [],
};
export default config;

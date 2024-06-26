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
        "symbol-small": "80px",
        "symbol-medium": "150px",
        "frame-small": "240px",
        "frame-medium": "450px",
      },
      height: {
        "symbol-small": "80px",
        "symbol-medium": "150px",
        "frame-small": "200px",
        "frame-medium": "350px",
      },
      boxShadow: {
        metal:
          " 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2) inset;",
      },
      backgroundImage: {
        "circle-gradient":
          "radial-gradient(circle at 10px 20px, #ff0000, #363636)",
        "metal-gradient-horizontal":
          "linear-gradient(0deg, #a9a9a9, #f5f5f5, #a9a9a9)",
        "metal-gradient-vertical":
          "linear-gradient(90deg, #a9a9a9, #f5f5f5, #a9a9a9)",
      },
    },
  },
  plugins: [],
};
export default config;

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
        "frame-medium": "370px",
      },
      height: {
        "symbol-small": "70px",
        "symbol-medium": "120px",
        "frame-small": "200px",
        "frame-medium": "300px",
      },
      boxShadow: {
        metal:
          " 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2) inset;",
      },
      backgroundImage: {
        "circle-gradient":
          "radial-gradient(circle at 10px 20px, #ff0000, #363636)",
        "metal-gradient-horizontal":
          "linear-gradient(0deg, #a9a9a9,#ffffff, #a9a9a9)",
        "metal-gradient-vertical":
          "linear-gradient(90deg, #a9a9a9, #f5f5f5, #a9a9a9)",
        "body-gradient-horizontal":
          "linear-gradient(0deg, #dfdcdc,#ffffff, #dfdcdc)",
        "normal-metal": "linear-gradient(90deg, #a9a9a9, #f5f5f5, #a9a9a9);",
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

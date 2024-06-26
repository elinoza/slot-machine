import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "circle-gradient":
          "radial-gradient(circle at 10px 20px, #ff0000, #363636)",
        "cylindir-gradient":
          "radial-gradient(circle at 150px 150px, #ff0000, #171717)",
      },
    },
  },
  plugins: [],
};
export default config;

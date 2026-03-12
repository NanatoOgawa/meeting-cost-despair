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
        blood: "#8B0000",
        "blood-bright": "#FF0000",
      },
      fontFamily: {
        digital: ["Digital-7", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

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
        primary:"#f0f8ff", ///"blancp"
        secondary:"#465059", //gris oscuro
        secondary2:"rgb(187 194 200)", // gris claro
        accent:"#3d7a55", //verde oscuro
        accent2:"#93b9a4", //verde claro

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;

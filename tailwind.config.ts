import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        mainBg: "url('/images/bg.png')"
      },
      colors: {
        primary: "var(--primary-color)",
        action: "var(--action-color)",
        highlight: "var(--highlight-color)",
        danger: "var(--danger-color)",
        title: "var(--title-color)",
        white: "var(--white)",
        gray: "var(--gray)",
        deepgray: "var(--deep-gray)",
        black: "var(--black)"
      }
    },
    fontFamily: {
      monda: ["var(--font-monda)"]
    }
  },
  plugins: []
}
export default config

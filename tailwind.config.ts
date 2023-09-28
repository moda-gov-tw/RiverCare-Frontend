import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        action: "var(--action-color)",
        highlight: "var(--highlight-color)",
        danger: "var(--danger-color)",
        title: "var(--title-color)",
        white: "var(--white)",
        gray: "var(--gray)",
        black: "var(--black)"
      }
    }
  },
  plugins: []
}
export default config

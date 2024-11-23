import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundImage:{
          shade:"linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.35),rgba(0,0,0,0.45))",

        },
        shade:"linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.35),rgba(0,0,0,0.45))",
        theme:"linear-gradient(#B22222,#780606,#080808)",
        nav: "#18222f",
        page: "#2b3441",
        card: "#47566a",
        "card-hover": "#4f5e74",
        "default-text": "#f1f3f5",
        "blue-accent": "#0084d4",
        "blue-accent-hover": "#009fff",
      },
    },
  },
  plugins: [require('tailwindcss-gradients')],
} satisfies Config;

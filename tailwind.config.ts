import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0)), url('/images/tinder-hero.webp')",
      },
    },
  },
  plugins: [],
} satisfies Config;

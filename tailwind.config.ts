import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0)), url('/images/tinder-hero.webp')",
      },
      boxShadow: {
        "center-lg": "0 0 8px rgb(0, 0, 0, 0.15)",
      },
      maxHeight: { "116": "40rem" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["black"] },
} satisfies Config;

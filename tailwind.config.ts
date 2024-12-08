import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f5fd",
          100: "#efecfb",
          200: "#dfdbf9",
          300: "#c8bef4",
          400: "#ac9aeb",
          500: "#8967e0",
          600: "#7f51d6",
          700: "#6f3fc2",
          800: "#5c34a3",
          900: "#4d2d85",
          950: "#2f1b5a",
        },
      },
    },
  },
};

import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#14213d", mint: "#b8f2d0", lavender: "#e7ddff" }, boxShadow: { soft: "0 16px 50px rgba(20,33,61,.08)" } } },
  plugins: []
} satisfies Config;

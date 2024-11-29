/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#dafe02", // Add custom yellow color
      },
    },
    animation: {
      "slow-scroll": "scroll 15s linear infinite", // Adjust the duration here
    },
    keyframes: {
      scroll: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
  },
  plugins: [],
};

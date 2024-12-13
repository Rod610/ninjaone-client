/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: () => ({
        primary: "#337AB7",
        secondary: "#FFFFFF",
        danger: "#D53948",
      }),
    },
  },
  plugins: [],
};

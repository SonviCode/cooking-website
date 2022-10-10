/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        vert: "rgb(132 204 22)",
      },
      screens: {
        xs: "400px",
        xxl: "1280px",
      },
      gridTemplateColumns: {
        "auto-fit100": "repeat(auto-fit, minmax(100px, 1fr))",
        "auto-fit150": "repeat(auto-fit, minmax(150px, 1fr))",
        "auto-fit200": "repeat(auto-fit, minmax(200px, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(100px, 1fr))",
        // Simple 16 column grid
        14: "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

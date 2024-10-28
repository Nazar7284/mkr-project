// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeoutright: "fade-out-right 1s ease-in-out 1",
        fadeinright: "fade-in-right 1.3s ease-in-out 1",
      },
      keyframes: {
        "fade-out-right": {
          "0%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
          "100%": {
            opacity: 0,
            transform: "translate3d(100%, 0, 0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: 0,
            transform: "translate3d(-1000%, 0, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};

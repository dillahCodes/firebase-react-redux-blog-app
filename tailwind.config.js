/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "special-elite": ['"Special Elite"', "system-ui"],
        "roboto-slab": ["Roboto Slab", "serif"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  important: true,
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          overflow: "-moz-scrollbars-none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        ".scrollbar-custom::-webkit-scrollbar": {
          width: "5px",
        },
        ".scrollbar-custom::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        ".scrollbar-custom::-webkit-scrollbar-thumb": {
          background: "#58942e",
          "border-radius": "5px",
        },
        ".scrollbar-custom::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      };

      addUtilities(newUtilities, {
        variants: ["responsive", "hover"],
      });
    },
  ],
};

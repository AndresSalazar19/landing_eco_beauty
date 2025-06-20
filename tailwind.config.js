/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: ["selector", "[data-web-theme=dark]"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#779376",
          color: "#fff",
          light: {
            1: "#fcfdfc",
            2: "#f8fbf8",
            3: "#f0f3f0",
            4: "#e1e7e1",
            5: "#c4cfc4",
            6: "#abcfaa",
            7: "#a7b7a6",
            8: "#8a9f89",
            9: "#779376",
            10: "#5d725c",
            11: "#485948",
            12: "#2d362d",
          },
          dark: {
            1: "#1c211c",
            2: "#2d362d",
            3: "#394639",
            4: "#485948",
            5: "#5d725c",
            6: "#779376",
            7: "#8a9f89",
            8: "#a7b7a6",
            9: "#779376",
            10: "#abcfaa",
            11: "#c4cfc4",
            12: "#e1e7e1",
          },
        },
        accent: {
          "pink-pale": "#d9a4b1",
          "green-dark": "#5a7663",
          orange: "#b45e40",
          peach: "#ecbfbb",
          "pink-bright": "#de7a99",
          "pink-custom": "#E3A5B3",
          "text-dark": "#333333",
        },
        body: {
          light: {
            1: "#fcfcfd",
            2: "#f9f9fb",
            3: "#eff0f3",
            4: "#e7e8ec",
            5: "#e0e1e6",
            6: "#d8d9e0",
            7: "#cdced7",
            8: "#b9bbc6",
            9: "#8b8d98",
            10: "#80828d",
            11: "#62636c",
            12: "#1e1f24",
          },
          dark: {
            1: "#212224",
            2: "#28292b",
            3: "#303134",
            4: "#36373b",
            5: "#3c3d42",
            6: "#43444a",
            7: "#4f5058",
            8: "#666872",
            9: "#72747f",
            10: "#7d7f8a",
            11: "#b4b6bf",
            12: "#eeeef0",
          },
        },
      },
      borderColor: {
        alpha: {
          light: "#00073527",
          dark: "#d6dbfc2f",
        },
      },
      backgroundColor: {
        body: {
          striped: {
            light: "#00005506",
            dark: "#adc5f30f",
          },
        },
      },
      boxShadow: {
        "card-1": "0px 0px 40px 0px rgba(0, 0, 0, 0.08)",
        "card-2": "0px 10px 20px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

module.exports = {
  purge: ['./dist/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: {
        "max": "679px"
      },
      lg: "680px"
    },
    fontFamily: {
      "sans": ["Dosis"]
    },
    fontSize: {
      "sm": "1.2rem",
      "base": "1.6rem",
      "lg": "2rem",
      "xl": "2.4rem",
      "2xl": "2.8rem",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
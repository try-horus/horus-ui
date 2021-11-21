const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        horusBlue: '#081b53',
        horusYellow: '#FFdf6c'
      },
      fontFamily: {
        'head': ['Rubik'],
        'body': ['Roboto']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

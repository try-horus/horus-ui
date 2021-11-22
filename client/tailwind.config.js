const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        horusBlue: '#081b53',
        horusYellow: '#FFdf6c',
        horusViolet: '#b983FF',
        horusTurquoise : '#06dfd7'
      },
      fontFamily: {
        'head': ['Rubik'],
        'body': ['Roboto']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

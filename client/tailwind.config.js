const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
      fontFamily:{
        body:['Montserrat', 'sans-serif'],
        heading: ['Open Sans', 'sans-serif']
      },
      colors:{
        primary:{
          light: colors.white,
          dark: colors.black
        },
        card:{
          light:colors.white,
          dark:colors.gray[800]
        },
        search:{
          light: colors.gray[200],
          dark: colors.gray[700]
        },
        text:{
          primary:{
            light:colors.black,
            dark:colors.white
          },
          secondary:{
            light: colors.gray[600],
            dark: colors.gray[400]
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

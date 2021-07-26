const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Mono"', 'monospace', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: {
          light: '#ff9249',
          default: '#FF6600',
          dark: '#db5700',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

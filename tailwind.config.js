const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
        // heading: ["Syne", ...defaultTheme.fontFamily.sans],
        header: ["Hepta Slab", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '102': '28rem',
        '134': '36rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

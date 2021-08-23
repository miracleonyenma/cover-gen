const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        header: [
          'Source Sans Pro',
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
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

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '340px',
      'md': '640px',
      // => @media (min-width: 640px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    colors:{
      orange: colors.orange,
      gray: colors.gray,
      black: colors.black,
      white: colors.white,
      purple: colors.purple,
      blue: colors.blue,
      yellow: colors.yellow,
      pink: colors.pink,
      stone: colors.stone,
      'sqgreen': {
        '50': '#ecfff6',
        '100': '#d2ffee',
        '200': '#a8ffdd',
        '300': '#65ffc4',
        '400': '#1bffa4',
        '500': '#00f986',
        '600': '#00d06b',
        '700': '#00a257',
        '800': '#007e49',
        '900': '#006a41',
      },
      'gold': {
        '50': '#ffffe7',
        '100': '#feffc1',
        '200': '#fffd86',
        '300': '#fff441',
        '400': '#ffe50d',
        '500': '#ffd600',
        '600': '#d19d00',
        '700': '#a67102',
        '800': '#89570a',
        '900': '#74470f',
    },
      'burntsienna': {
        '50': '#fef3f2',
        '100': '#fee4e2',
        '200': '#fdcfcb',
        '300': '#fbada6',
        '400': '#f67d73',
        '500': '#ee5e52',
        '600': '#da3628',
        '700': '#b72a1e',
        '800': '#97261d',
        '900': '#7e251e',
    },
      'snow': {
      '50': '#f5f8f6',
      '100': '#dee9e2',
      '200': '#bdd2c5',
      '300': '#94b4a1',
      '400': '#6d947e',
      '500': '#537964',
      '600': '#41604f',
      '700': '#374e43',
      '800': '#2f4038',
      '900': '#2a3730',
  },
  'red': {
    '50': '#fff0f0',
    '100': '#ffdede',
    '200': '#ffc3c4',
    '300': '#ff999a',
    '400': '#ff5e60',
    '500': '#ff2b2e',
    '600': '#f60c0f',
    '700': '#e30609',
    '800': '#ab090b',
    '900': '#8d0f11',
},
'coral': {
  '50': '#fff4ed',
  '100': '#ffe7d5',
  '200': '#ffcba9',
  '300': '#fea673',
  '400': '#fd8753',
  '500': '#fb5214',
  '600': '#ec360a',
  '700': '#c4250a',
  '800': '#9b1f11',
  '900': '#7d1d11',
},
'venice': {
  '50': '#ecfaff',
  '100': '#d6f2ff',
  '200': '#b5eaff',
  '300': '#82deff',
  '400': '#48c8ff',
  '500': '#1eaaff',
  '600': '#068bff',
  '700': '#0073f5',
  '800': '#075cc6',
  '900': '#0c498e',
},
'mineshaft': {
  '50': '#f7f7f7',
  '100': '#e3e3e3',
  '200': '#c8c8c8',
  '300': '#a4a4a4',
  '400': '#818181',
  '500': '#666666',
  '600': '#515151',
  '700': '#434343',
  '800': '#3a3a3a',
  '900': '#313131',
},


    },
    extend: {
      spacing: {
        '128': '32rem',
      }
    },

  },
  plugins: [],
}
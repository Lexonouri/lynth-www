module.exports = {
  purge: ['./src/pages/**/*.js', './src/components/**/*.js'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    filter: {
      'none': 'none',
      'grayscale': 'grayscale(1)',
      'invert': 'invert(1)',
      'sepia': 'sepia(1)',
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(20px)',
    },
  },
  variants: {
    extend: {
      filter: ['responsive'],
      backdropFilter: ['responsive'],
      ringWidth: ['hover', 'active', 'group-hover'],
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: ['Rubik', 'sans-serif'],
        header: ['Heebo', 'sans-serif'],
      },
      fontSize: {
        tiny: '.875rem',
        '7xl': '5rem',
      },
      minWidth: {
        xs: '200px',
        sm: '300px',
        md: '500px',
        lg: '800px',
      },
      colors: {
        primaryLight: '#CEE4FD',
        primary: '#55A3FA',
        primaryDark: '#2B76CA',
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
      },
    },
    variants: {
      transitionDuration: ['responsive', 'hover', 'focus'],
      textAlign: ['responsive', 'direction'],
      float: ['responsive', 'direction'],
      margin: ['responsive', 'direction'],
      padding: ['responsive', 'direction'],
      fontFamily: ['responsive', 'hover', 'focus', 'direction'],
      gradients: ['responsive', 'hover'],
      visibility: ['responsive', 'hover'],
    },
    plugins: [require('tailwindcss-dir')()],
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}

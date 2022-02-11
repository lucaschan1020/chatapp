let plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem'
      },
      colors: {
        'primary': '#36393f',
        'secondary': '#2f3136',
        'secondary-alt': '#292b2f',
        'tertiary': '#202225',
        'header-primary': '#ffffff',
        'header-secondary': '#b9bbbe',
        'channel-default': '#8e9297',
        'interactive-normal': '#b9bbbe',
        'interactive-hover': '#dcddde',
        'modifier-hover': 'rgba(79,84,92,0.16)',
        'muted': '#72767d'
      },
    },
    fontFamily: {
      'primary': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif',
      'display': 'Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif'
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar', '&::-webkit-scrollbar')
    }),
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar-corner', '&::-webkit-scrollbar-corner')
    }),
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar-thumb', '&::-webkit-scrollbar-thumb')
    })
  ],
}
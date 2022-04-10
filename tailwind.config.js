let plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {},
      colors: {
        primary: '#36393f',
        secondary: '#2f3136',
        'secondary-alt': '#292b2f',
        tertiary: '#202225',
        'header-primary': '#ffffff',
        'header-secondary': '#b9bbbe',
        'channel-default': '#8e9297',
        'channeltextarea-background': '#40444b',
        'channeltextarea-placeholder': '#72767d',
        normal: '#dcddde',
        'interactive-normal': '#b9bbbe',
        'interactive-hover': '#dcddde',
        'interactive-active': '#ffffff',
        'interactive-muted': '#4f545c',
        'interactive-green-normal': 'hsl(139,47.3%,43.9%)',
        'interactive-red-normal': 'hsl(359,82.6%,59.4%)',
        'modifier-accent': 'hsla(0,0%,100%,0.06)',
        'modifier-hover': 'rgba(79,84,92,0.16)',
        'modifier-active': 'rgba(79,84,92,0.24)',
        'modifier-accent': 'hsla(0,0%,100%,0.06)',
        'modifier-selected': 'rgba(79,84,92,0.32)',
        'message-hover': 'rgba(4,4,5,0.07)',
        muted: '#72767d',
        'scrollbar-thin-thumb': '#202225',
        'scrollbar-auto-track': 'hsl(210,9.8%,20%)',
        'mobile-primary': '#36393f',
        'deprecated-text-input-bg': '#202225',
        'deprecated-text-input-border': 'rgba(0,0,0,0.3)',
        'brand-experiment': 'hsl(235,85.6%,64.7%)',
        'brand-experiment-560': 'hsl(235,51.4%,52.4%)',
        'brand-experiment-600': 'hsl(235,46.7%,44.1%);',
        'text-link': 'hsl(197,100%,47.8%)',
        positive: 'hsl(139,51.6%,52.2%)',
        danger: 'hsl(359,82%,73.9%)',
        'status-positive': 'hsl(139,47.3%,43.9%)',
        'status-danger': 'hsl(359,82.6%,59.4%);',
      },
      boxShadow: {
        'elevation-low':
          '0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)',
        'elevation-stroke': '0 0 0 1px rgba(4,4,5,0.15)',
        login: '0 2px 10px 0 rgb(0 0 0 / 20%)',
      },
    },
    fontFamily: {
      primary: 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif',
      display: 'Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif',
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar', '&::-webkit-scrollbar');
    }),
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar-corner', '&::-webkit-scrollbar-corner');
    }),
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar-thumb', '&::-webkit-scrollbar-thumb');
    }),
    plugin(function ({ addVariant }) {
      addVariant('-webkit-scrollbar-track', '&::-webkit-scrollbar-track');
    }),
    plugin(function ({ addVariant }) {
      addVariant('placeholder-not-shown', '&:not(:placeholder-shown)');
    }),
  ],
};

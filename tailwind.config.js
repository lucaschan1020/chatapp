let plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {},
      colors: {
        primary: "#36393f",
        secondary: "#2f3136",
        "secondary-alt": "#292b2f",
        tertiary: "#202225",
        "header-primary": "#ffffff",
        "header-secondary": "#b9bbbe",
        "channel-default": "#8e9297",
        "channeltextarea-background": "#40444b",
        normal: "#dcddde",
        "interactive-normal": "#b9bbbe",
        "interactive-hover": "#dcddde",
        "interactive-active": "#ffffff",
        "modifier-hover": "rgba(79,84,92,0.16)",
        muted: "#72767d",
        "scrollbar-thin-thumb": "#202225",
        "scrollbar-auto-track": "hsl(210,9.8%,20%)",
      },
      boxShadow: {
        "low-elevation":
          "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
      },
    },
    fontFamily: {
      primary: 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif',
      display: 'Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif',
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("-webkit-scrollbar", "&::-webkit-scrollbar");
    }),
    plugin(function ({ addVariant }) {
      addVariant("-webkit-scrollbar-corner", "&::-webkit-scrollbar-corner");
    }),
    plugin(function ({ addVariant }) {
      addVariant("-webkit-scrollbar-thumb", "&::-webkit-scrollbar-thumb");
    }),
    plugin(function ({ addVariant }) {
      addVariant("-webkit-scrollbar-track", "&::-webkit-scrollbar-track");
    }),
    plugin(function ({ addVariant }) {
      addVariant("placeholder-not-shown", "&:not(:placeholder-shown)");
    }),
  ],
};

module.exports = {
  content: ["themes/**/*.html", "themes/**/*.css"],
  theme: {
    extend: {
      colors: {
        yellow: {
          primary: "#FFC000",
          secondary: "#FFDF80",
          tertiary: "#FFEFBF",
        },
        grey: {
          primary: "#F4F5F3",
          secondary: "#D9D9D9",
          tertiary: "#B4B4B4",
          quaternary: "#7E7E7E",
        },
        dark: {
          grey: "#504B58",
        },
      },
      content: {
        subMenuChevron: 'url("/media/subMenu-chevron.svg")',
      },
      screens: {

        xs: "475px",
      },
    },
  },
};

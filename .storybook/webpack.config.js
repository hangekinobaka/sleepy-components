const path = require("path");

module.exports = ({ config }) => {
  config.resolve.extensions.push(
    ".vue",
    ".css",
    ".less",
    ".scss",
    ".sass",
    ".html"
  );

  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "../src"),
    "@component": path.resolve(__dirname, "../src/components"),
    "@plugin": path.resolve(__dirname, "../src/plugin"),
    "@utils": path.resolve(__dirname, "../src/utils"),
    "@layout": path.resolve(__dirname, "../src/layout"),
    "@assets": path.resolve(__dirname, "../src/assets")
  };

  config.module.rules.push({
    test: /\.scss$/,
    // Global SCSS: https://github.com/storybookjs/storybook/issues/6743#issuecomment-490822920
    use: [
      "vue-style-loader",
      "css-loader",
      {
        loader: "sass-loader"
      }
    ]
  });

  return config;
};

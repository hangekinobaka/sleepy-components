const path = require("path");

module.exports = {
  // publicPath: process.env.PUBLIC_PATH || "",
  // devServer: {},
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@component": path.resolve(__dirname, "src/components")
      }
    }
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // sass: {
      //   data: `@import "~@joyz/core/styles/_core.scss";`
      // }
    }
  }
};

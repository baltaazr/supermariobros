const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: "dist",
    port: 3000
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "public/assets",
        to: "assets"
      }
    ]),
    new HTMLWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    })
  ]
};

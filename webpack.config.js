const path = require("path")

module.exports = {
  /*entry: "./src/perfectRatio.js",
  output: {
    filename: "perfectRatio.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "perfectRatio"
  },*/
  entry: "./sample/src/ui.js",
  output: {
    filename: "ui.min.js",
    path: path.resolve(__dirname, "./sample/dist"),
    library: "perfectRatioUI"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./sample")
    //contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}

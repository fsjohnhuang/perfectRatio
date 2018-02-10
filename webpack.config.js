const path = require("path")

module.exports = {
  entry: "./src/perfectRatio.js",
  output: {
    filename: "perfectRatio.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "perfectRatio"
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

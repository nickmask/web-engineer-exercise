const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/index.jsx"],
  devServer: {
    historyApiFallback: true,
    contentBase: "./"
  },
  output: {
    filename: "index_bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist")
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader"
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        options: {
          modules: {
            mode: "local",
            localIdentName: "[name]__[local]--[hash:base64:5]"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};

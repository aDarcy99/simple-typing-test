var {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }]
    }, {
      test: /\.css$/i,
      include: path.resolve(__dirname, 'src'),
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    symlinks: true,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'views')],
    compress: true,
    hot: true,
    writeToDisk: true,
    port: 5500,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
}
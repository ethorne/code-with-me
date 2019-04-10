const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  devtool: '#source-map',
  entry: path.resolve(__dirname, 'server.js'),
  module: {
    rules: [
      {
        test: /^.*\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /^.*\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      }
    ]
  },
  output: {
    filename: 'computer-tutor.client.dev.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/views/index.html'),
      filename: path.resolve(__dirname, 'src/views/index.html'),
    })
    new MiniCssExtractPlugin({filename: 'main.css'})
  ],
  target: 'web'
}

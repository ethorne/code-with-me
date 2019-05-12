const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outputDirectory = 'dist';

module.exports = {
    entry: ['babel-polyfill', './src/client/index.js'],
    output: {
      filename: `computer-tutor.development.bundle.js`,
      path: path.join(__dirname, outputDirectory),
      publicPath: '/',
    },
    target: 'web',
    module: {
      
      rules: [
        {
          test: /^.*\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      })
    ]
  }

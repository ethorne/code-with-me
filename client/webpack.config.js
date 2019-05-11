const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = (env, argv) => {
  let ret = {
    devtool: '#source-map',
    entry: path.resolve(__dirname, 'src/index.js'),
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
              ],
              'plugins': [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        },
        {
          // TODO : something beter for this for prod
          // maybe just use url-loader
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        //{
        //  test: /^.*\.html$/,
        //  exclude: /node_modules/,
        //  use: 'html-loader',
        //  options: {
        //    minimize: argv.mode === 'production'
        //  }
        //}
      ]
    },
    output: {
      filename: 'computer-tutor.client.react.dev.bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: path.resolve(__dirname),
    },
    target: 'web'
  }

  if (argv.mode === 'production') {
    ret.plugins = [
      new MiniCssExtractPlugin({
        filename: 'index.css'
      })
    ];

    ret.module.rules.push({
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    });

    ret.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    };
  } else { // development
    ret.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    });
  }
  if (argv.mode === 'developmen') {
    ret.plugins = [
      new WebpackShellPlugin({
        onBuildStart: ['npm run clean'],
        onBuildEnd: ['cp dist/* ../server/dist'],
      })
    ]
  }

  return ret;
}


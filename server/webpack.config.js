const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/server.js'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /^.*\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    // force regular Node.js __filename behavior:
    // filename/dirname of output file when run in a Node.js environment
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'computer-tutor.server.dev.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname),
  },
  target: 'node'
}

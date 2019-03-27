const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'server.js'),
  devtool: 'inline-source-map',
  output: {
    filename: 'computer-tutor.server.dev.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /^.*\.js/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

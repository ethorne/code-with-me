const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  return({
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, 'src/server.js'),
    mode: argv.mode,
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
      filename: `computer-tutor.server.${argv.mode}.bundle.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: path.resolve(__dirname),
    },
    target: 'node'
  });
}

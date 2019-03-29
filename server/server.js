/////////////////////////////////////////////////////////////////// DEPENDENCIES

const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');


////////////////////////////////////////////////////////// ENVIRONMENT VARIABLES

const port = process.env.PORT || 5000;
const serverRoot = __dirname;

const app = express();
const config = require(`${serverRoot}/webpack.config.js`)
const webpackConfig = {
  compiler: webpack(config),
  options: {
    publicPath: config.output.publicPath,
    hot: config.mode === 'development',
    contentBase: `${serverRoot}/dist`,
    watchContentBase: true,
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:8000',
        secure: false,
      }
    ],
    port: port
  }
};

const dataCtrlDir = `${serverRoot}/src/controllers/data`;
const viewCtrlDir = `${serverRoot}/src/controllers/view`;

const controllers = {
  data: {
    application: require(`${dataCtrlDir}/applicationController.js`)
  },
  view: {
    //example: require(`${viewCtrlDir}/exampleController.js`)
  }
}

/////////////////////////////////////////////////////////////////// SERVER SETUP

app.use(webpackDevMiddleware(webpackConfig.compiler, webpackConfig.options));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

/////////////////////////////////////////////////////////////////// URL MAPPINGS

app.get('/', controllers.data.application.info);

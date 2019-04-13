// DEPENDENCIES

let express = require('express');
let bodyParser = require('body-parser');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');


// ENVIRONMENT VARIABLES

const port = process.env.PORT || 5000;
console.log(__dirname);
const srcDir = __dirname;

const app = express();
const config = require(`${srcDir}/../webpack.config.js`)
const webpackConfig = {
  compiler: webpack(config),
  options: {
    publicPath: config.output.publicPath,
    hot: true,
    contentBase: `${srcDir}/dist`,
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

const dataCtrlDir = `${srcDir}/controllers/data`;
const viewCtrlDir = `${srcDir}/controllers/view`;

const controllers = {
  data: {
    application: require(`${dataCtrlDir}/applicationController.js`)
  },
  view: {
    //example: require(`${viewCtrlDir}/exampleController.js`)
  }
}

// SERVER SETUP

app.use(webpackDevMiddleware(webpackConfig.compiler, webpackConfig.options));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// URL MAPPINGS

app.get('/', controllers.data.application.info);

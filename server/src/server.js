// DEPENDENCIES

let express = require('express');
let bodyParser = require('body-parser');
let webpack = null;
let webpackDevMiddleware = null;
if (process.env.NODE_ENV === 'development') {
  webpack = require('webpack');
  webpackDevMiddleware  = require('webpack-dev-middleware');
}


// ENVIRONMENT VARIABLES

const port = process.env.PORT || 5000;
global.srcDir = __dirname;


const app = express();
let webpackConfig = null;
if (process.env.NODE_ENV === 'development') {
  // this feels gross and hacky...
  let config = require(`${global.srcDir}/../webpack.config.js`);
  config = config(process.env, {mode:process.env.NODE_ENV});
  webpackConfig = {
    compiler: webpack(config),
    options: {
      publicPath: config.output.publicPath,
      hot: true,
      contentBase: `${global.srcDir}/dist`,
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
}

const dataCtrlDir = `${global.srcDir}/controllers/data`;
const viewCtrlDir = `${global.srcDir}/controllers/view`;

const controllers = {
  data: {
    application: require(`${dataCtrlDir}/applicationController.js`)
  },
  view: {
    react: require(`${viewCtrlDir}/reactController.js`)
  }
}

// SERVER SETUP

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(webpackConfig.compiler, webpackConfig.options));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
}

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// URL MAPPINGS

app.get('/', controllers.data.application.info);

app.get('/view/react', controllers.view.react.getView);

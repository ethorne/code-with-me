/////////////////////////////////////////////////////////////////// DEPENDENCIES

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

////////////////////////////////////////////////////////// ENVIRONMENT VARIABLES

const port = process.env.PORT || 5000;
const serverRoot = process.env.SERVER_ROOT || '';
const clientRoot = process.env.CLIENT_ROOT || '';

const dataCtrlDir = `${serverRoot}/controllers/data`;
const viewCtrlDir = `${serverRoot}/controllers/view`;

const controllers = {
  data: {
    application: require(`${dataCtrlDir}/applicationController.js`)
  },
  view: {
    //example: require(`${viewCtrlDir}/exampleController.js`)
  }
}

/////////////////////////////////////////////////////////////////// SERVER SETUP

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

/////////////////////////////////////////////////////////////////// URL MAPPINGS

app.get('/', controllers.data.application.info);
app.get('/', controllers.data.application.info);



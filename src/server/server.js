// DEPENDENCIES

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

// ENVIRONMENT VARIABLES

const port = process.env.PORT || 5000;
const app = express();
const dataCtrlDir = `${global.srcDir}/controllers/data`;
const viewCtrlDir = `${global.srcDir}/controllers/view`;

// const controllers = {
//   data: {
//     application: require(`${dataCtrlDir}/applicationController.js`)
//   },
//   view: {
//     react: require(`${viewCtrlDir}/reactController.js`)
//   }
// }

// SERVER SETUP

if (process.env.NODE_ENV === 'development') {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
}

app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// URL MAPPINGS

app.use(express.static('dist'));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
});

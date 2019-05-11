let path = require('path');
let root = '';
exports.getView = (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.sendFile(path.join(global.srcDir, 'html/react.dev.html'));
  } else if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(global.srcDir, 'html/react.prod.html'));
  } else {
    console.log(`invalid environment "${process.env.NODE_ENV}"`);
    // TODO : send an error.html kind of file
  }
};

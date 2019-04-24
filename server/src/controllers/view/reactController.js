let path = require('path');

exports.getView = (req, res) => {
  res.sendFile(path.join(__dirname, '../../../html/react/index.html'));
};

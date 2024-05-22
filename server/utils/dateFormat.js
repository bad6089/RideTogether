const moment = require('moment');

const dateFormat = (timestamp) => {
  return moment(timestamp).fromNow();
};

module.exports = dateFormat;

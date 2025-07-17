const winstonLogger = require("../config/winston-logger");

function error(err, req, res, next) {
  winstonLogger.warn(err.message, err);
  res.status(500).send("Something Failed...");
}

module.exports = error;

const winston = require("winston");

function error(err, req, res, next) {
  winston.error(err.message, err); // Pass the error message and complete error ( Helps to print stack trace)
  res.status(500).send("Something Failed...");
}

module.exports = error;

require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

// This module is responsible for handling and logging errors using Winston.
// 'express-async-errors' handles exceptions in async route handlers, so it's included here since it is responsible for error handling.

// Make sure place this first in index.js
function logger() {
  winston.add(
    new winston.transports.File({
      filename: "winston-logfile.log",
      level: "warn",
    })
  );
  winston.add(new winston.transports.Console());
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "warn",
    })
  );

  process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");
    winston.error(ex.message, ex);
    setTimeout(() => process.exit(1), 1000);
  });

  process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN UNHANDLED REJECTION");
    winston.error(ex.message, ex);
    setTimeout(() => process.exit(1), 1000);
  });
}

module.exports = logger;

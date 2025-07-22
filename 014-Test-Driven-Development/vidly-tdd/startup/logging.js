require("express-async-errors");
const winston = require("winston");
const { format, transports } = winston;
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

  winston.add(
    new transports.Console({
      level: "silly",
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.printf(({ level, message, stack }) => {
          return stack
            ? ` ${level}: ${message}\n${stack}`
            : ` ${level}: ${message}`;
        })
      ),
    })
  );

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

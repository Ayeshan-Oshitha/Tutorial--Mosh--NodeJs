const winston = require("winston");

// Custom Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} [${level}]: ${message}\n${stack}`
            : `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "winston-logfile.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = logger;

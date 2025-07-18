const mongoose = require("mongoose");
const winston = require("winston");

function db() {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => winston.info("Connected to MongoDB"));
  // Removed the catch block to allow unhandled promise rejections to be caught by the global unhandledRejection handler.
  // This ensures that the process will log the error properly and terminates the process.
}

module.exports = db;

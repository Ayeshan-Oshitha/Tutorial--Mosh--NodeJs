require("dotenv").config();
require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const winston = require("winston");
require("winston-mongodb");
const db = require("./startup/db");
const routes = require("./startup/route");
const express = require("express");
const app = express();

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

db();
routes(app);

if (!process.env.JWT_SECRET_KEY) {
  console.error("FATAL ERROR: JWT_SECRET_KEY is not defined.");
  process.exit(1);
}

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Vidly",
    heading: "Vidly App",
    message: "Welcome to the vidly application",
  });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

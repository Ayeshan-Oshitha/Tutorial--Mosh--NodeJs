require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const logger = require("./startup/logging");
const db = require("./startup/db");
const routes = require("./startup/route");
const express = require("express");
const app = express();

logger();
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

const Joi = require("joi");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const logger = require("./middleware/logger");
const home = require("./routes/home");
const courses = require("./routes/courses");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

if (app.get("env") == "development") {
  startupDebugger("morgan enabled");
  app.use(morgan("tiny"));
}

app.use("/", home);
app.use("/api/courses", courses);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

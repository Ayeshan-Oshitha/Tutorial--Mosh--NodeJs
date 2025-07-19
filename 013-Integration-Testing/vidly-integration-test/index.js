const winston = require("winston");

const logger = require("./startup/logging");
const validation = require("./startup/validation");
const db = require("./startup/db");
const config = require("./startup/config");
const view = require("./startup/view");
const routes = require("./startup/route");

const express = require("express");
const app = express();

logger();
config();
db();
validation();
view(app);
routes(app);

const port = process.env.PORT || 3003;

const server = app.listen(port, () => {
  winston.info(`Server is listening on ${port}...`);
});

module.exports = server;

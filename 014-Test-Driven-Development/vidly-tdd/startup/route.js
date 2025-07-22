const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rental");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const returns = require("../routes/returns");

function routes(app) {
  // We pass the 'app' instance here to ensure that the entire application uses a single Express app instance.
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
}

module.exports = routes;

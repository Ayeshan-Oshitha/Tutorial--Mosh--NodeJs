const logger = require("./startup/logging");
const validation = require("./startup/validation");
const db = require("./startup/db");
const config = require("./startup/config");
const routes = require("./startup/route");
const express = require("express");
const app = express();

logger();
config();
db();
validation();
routes(app);

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

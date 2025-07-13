const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.error("Couldn't connect to mongoDB"));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Vidly",
    heading: "Vidly App",
    message: "Welcome to the vidly application",
  });
});

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

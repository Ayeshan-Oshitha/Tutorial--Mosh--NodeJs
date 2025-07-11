const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Vidly App",
    heading: "Vidly App",
    message: "Welcome to the vidly application",
  });
});

app.use("/api/genres", genres);

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

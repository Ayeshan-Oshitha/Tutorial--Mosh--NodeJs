const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");

const app = express();
app.use(express.json());
app.use("/api/genres", genres);

app.get("/", (req, res) => {
  res.send("Welcome to the Vidly App");
});

const port = process.env.PORT || 3003;
router.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

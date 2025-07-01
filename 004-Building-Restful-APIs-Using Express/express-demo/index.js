const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Client!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});

// Route Parameters
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

// Query Parameters
app.get("/api/courses", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

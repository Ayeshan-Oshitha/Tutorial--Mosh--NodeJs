const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Pop", rating: 4.7 },
  { id: 2, name: "Rock", rating: 4.6 },
  { id: 3, name: "Classic", rating: 4.8 },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Vidly App");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    rating: req.body.rating,
  };

  console.log(genre);

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genre.name = req.body.name;
  genre.rating = req.body.rating;

  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    rating: Joi.number(),
  });

  return schema.validate(genre);
}

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

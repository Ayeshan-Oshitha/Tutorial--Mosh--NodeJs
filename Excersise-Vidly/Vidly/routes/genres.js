const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = new Genre({
    name: req.body.name,
  });

  let result = await genre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  genre.name = req.body.name;

  let result = await genre.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;

const validateObjectId = require("../middleware/validateObjectIs");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Genre, validateGenre } = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
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

router.put("/:id", auth, validateObjectId, async (req, res) => {
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

router.delete("/:id", auth, admin, validateObjectId, async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
  res.send(genre);
});

module.exports = router;

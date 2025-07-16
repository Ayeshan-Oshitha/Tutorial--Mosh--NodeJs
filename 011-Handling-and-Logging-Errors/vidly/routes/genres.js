const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const express = require("express");
const { Genre, validateGenre } = require("../models/genre");

const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).send("The genre with the given ID was not found.");
    }

    res.send(genre);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({
      name: req.body.name,
    });

    let result = await genre.save();
    res.send(result);
  })
);

router.put(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
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
  })
);

router.delete(
  "/:id",
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      return res.status(404).send("The genre with the given ID was not found.");
    }
    res.send(genre);
  })
);

module.exports = router;

const { User, validateUser } = require("../models/user");
const _ = require("lodash");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Alternatively, you can use Lodash's `pick` method to create the new user object
  // const newUser = new User(_.pick(req.body, ["name", "email", "password"]));

  const result = await newUser.save();

  res.send(_.pick(result, ["_id", "name", "email"]));
});

module.exports = router;

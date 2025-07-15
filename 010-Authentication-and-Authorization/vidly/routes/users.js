const { User, validateUser } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
  });

  // Alternatively, you can use Lodash's `pick` method to create the new user object
  // const newUser = new User(_.pick(req.body, ["name", "email", "password"]));

  const result = await newUser.save();

  const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET_KEY);

  res
    .header("x-auth-token", token)
    .send(_.pick(result, ["_id", "name", "email"]));
});

module.exports = router;

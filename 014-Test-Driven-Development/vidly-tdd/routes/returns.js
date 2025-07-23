const { Rental } = require("../models/rental");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId) {
    // Don't think about Joi, Just write the simplese test case
    return res.status(400).send("CustomerId not provided");
  }

  if (!req.body.movieId) {
    // Don't think about Joi, Just write the simplese test case
    return res.status(400).send("CustomerId not provided");
  }

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) {
    return res.status(404).send("Rental not found");
  }

  if (rental.dateReturned) {
    return res.status(400).send("Return already processed");
  }

  rental.dateReturned = new Date();
  await rental.save();

  return res.status(200).send();
});

module.exports = router;

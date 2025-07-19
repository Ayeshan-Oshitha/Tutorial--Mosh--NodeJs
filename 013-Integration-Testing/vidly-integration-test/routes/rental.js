const auth = require("../middleware/auth");
const { Rental, validateRental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status(400).send("Invalid Customer");
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status(400).send("Invalid Movie");
  }

  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie not in stock");
  }

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // Not working MongoDB transactions Local ,
  // const session = await mongoose.startSession();
  // session.startTransaction();

  // try {
  //   const result = await rental.save({ session });

  //   movie.numberInStock--;
  //   await movie.save({ session });

  //   await session.commitTransaction();
  //   session.endSession();

  //   res.send(result);
  // } catch (error) {
  //   await session.abortTransaction();
  //   session.endSession();
  //   console.error("error is : ", error);
  //   res.status(500).send("Something failed...");
  // }

  // No Transaction version - for demo
  const result = await rental.save();

  movie.numberInStock--;
  await movie.save();

  res.send(result);
});

module.exports = router;

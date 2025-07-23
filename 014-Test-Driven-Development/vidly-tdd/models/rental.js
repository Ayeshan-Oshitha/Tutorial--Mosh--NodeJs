const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  // We use a simplified customer and movie schema here because, when displaying rental data, we only need to show the essential customer properties.
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
      },

      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

rentalSchema.statics.lookup = function (customerId, movieId) {
  // this will reference the Rental class
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId,
  });
};

rentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validateRental = validateRental;

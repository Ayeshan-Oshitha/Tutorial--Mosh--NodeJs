const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
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
});

const Customer = mongoose.model("Customer", customerSchema);

function validateRequest(customer) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().trim().min(5).max(50).required(),
  });

  return schema.validate(customer);
}

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.Customer = Customer;
exports.validateRequest = validateRequest;
exports.validateId = validateId;

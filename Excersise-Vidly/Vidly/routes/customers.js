const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

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

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format.");
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).send("The customer with the given ID was not found");
  }

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateRequest(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const customer = new Customer({
      name: req.body.name.trim(),
      isGold: req.body.isGold,
      phone: req.body.phone.trim(),
    });

    const result = await customer.save();
    res.send(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).send(messages.join(", "));
    }
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format.");
  }

  const { error } = validateRequest(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name.trim(),
        isGold: req.body.isGold,
        phone: req.body.phone.trim(),
        //  1. If `isGold` or `phone` is NOT included in the request body:
        //          Their existing values in the database will remain unchanged.  - Correct Behaviour
        //  2. If `isGold` or `phone` is sent as `null`:
        //          Joi validation will reject the request (as expected). - Correct Behaviour
        //  3. If `phone` is sent as an empty string with spaces (e.g., "  ")
        //          This will overwrite the current value in the database with an empty string - Wrong Behaviour
        //          Solution - Always add the trim() to strings[in Joi as well as Saving]. And try to use min() too.
      },
    },
    { new: true }
  );

  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  }

  return res.send(customer);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID format.");
  }

  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  }
  res.send(customer);
});

function validateRequest(customer) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().trim().min(5).max(50).required(),
  });

  return schema.validate(customer);
}

module.exports = router;

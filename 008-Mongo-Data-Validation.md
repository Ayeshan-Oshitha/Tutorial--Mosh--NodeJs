# Validation

When we are saving a document,**MongoDB itself doesn’t enforce validation**. Validation is handled by Mongoose, which is an ODM (Object Data Modeling) library for MongoDB. In contrast, in SQL databases, we can define constraints (like `NOT NULL`, UNIQUE, or data types) at the schema/table level, and the database will reject invalid data. But in MongoDB , it doesn't validate anything by default — it accepts any structure unless validation is explicitly set

We can ensure basic validation in Mongoose using the `required` property and other schema options.

When we add validation rules in the **Mongoose schema**, they will be **automatically applied at the time of saving the document**.
We can also explicitly trigger validation using .validate() or .validateSync(), but it's usually not necessary unless you're manually checking before saving.

**Q**: Earlier we used Joi to validate the request. Here, we used another validator. What should we use?

**A**: Both — because:

- We should validate the request body (e.g., using Joi) when the client sends the data — this ensures that incoming data is correct before processing.

- We should also validate the data at the database layer (e.g., using Mongoose schema validation), because errors can happen at any point, and we should not rely only on client-side or request-level validation.

# Built-in Validator

- **required**

  - Can be set to a boolean (true or false).
  - Can also be set to a _function_ to make the field conditionally required.
  - Note: You must use a _regular function_, not an arrow function, because arrow functions don't have their own this context.

- **For String fields, you can use:**

  - minlength – minimum number of characters
  - maxlength – maximum number of characters
  - match – to validate with a regex pattern
  - enum – to allow only specific values

- **For Number and Date fields, you can use:**

  - min – minimum allowed value
  - max – maximum allowed value

# Custom Validators

Sometimes, the built-in validators are not enough, so we need to create custom validation logic.

# Async Validator

Sometimes, our custom validation logic may involve reading data from a database or calling a remote HTTP service. In such cases, the result is not immediately available. Therefore, we need to use an asynchronous validator to handle this kind of validation properly.

Earlier, custom validator logic used **callbacks** for asynchronous operations. But now, it uses **Promises** or **async/await** instead.

```javascript
// async/ await version
tags: {
  type: Array,
  validate: {
    validator: async function (v) {
      await new Promise((r) => setTimeout(r, 4000));
      return v && v.length > 0;
    },
    message: "A course should have at least one tag",
  },
}
```

# Validation Errors

When we iterate over the `errors` object in a validation exception, we can get the **full details of each individual validation error**.

```javascript
catch (ex) {
    for(field in ex.errors){
      console.log(ex.errors[field])
    }
  }
```

# Schema Type Options

In addition to validation properties, Mongoose schema types also support other useful options:

- String fields:

  - lowercase: converts the value to lowercase automatically
  - uppercase: converts the value to uppercase automatically
  - trim: removes leading and trailing whitespace

- Number fields:

  - min, max: for validation
  - get, set: use custom **getters and setters** to transform the value
  - Math.round: can be used in a setter to round values automatically

---

# My Notes

- We should use both Joi as well as Mongoose validators to check the data. (✅ Joi is used to validate the request body, and ✅ Mongoose validators are used to validate the data when saving to the database.)

- I think we should validate the type of ID (req.params.id) to check whether it's a valid MongoDB ObjectId.

- When using Mongoose schema validation, we should always use a try/catch block to catch errors. This is because the database can throw Mongoose validation errors as well as other kinds of errors. So, always use a try/catch block — otherwise the program may crash.

  ```javascript
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
  ```

- Mongoose validation **only works on** `.save()` and `.create()` methods. If we need it to work on other methods (like findByIdAndUpdate), we must explicitly enable it using the runValidators: true option.

  ```javascript
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name.trim(),
        isGold: req.body.isGold,
        phone: req.body.phone.trim(),
      },
    },
    { new: true, runValidators: true } // 👈 This line makes validation work
  );
  ```

- Extra

  - I think it is good to trim the strings in Joi as well as when saving.

  - Also, it's better to use minlength/maxlength in both the schema and Joi.

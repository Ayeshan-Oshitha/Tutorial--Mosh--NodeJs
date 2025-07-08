# Validation

When we are saving a document,**MongoDB itself doesn’t enforce validation**. Validation is handled by Mongoose, which is an ODM (Object Data Modeling) library for MongoDB. In contrast, in SQL databases, we can define constraints (like `NOT NULL`, UNIQUE, or data types) at the schema/table level, and the database will reject invalid data. But in MongoDB , it doesn't validate anything by default — it accepts any structure unless validation is explicitly set

We can ensure basic validation in Mongoose using the `required` property and other schema options.

When we add validation rules in the Mongoose schema, they will be **automatically applied at the time of saving the document**.
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

Sometumes our custom validation logic may invlev someting oiek reading data from our database or from a remote HTTP service. So resulty weill not vailable at once In that case we need asynchronoys validator.

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

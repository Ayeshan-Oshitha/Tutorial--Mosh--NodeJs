# Validation

When we are saving a document,**MongoDB itself doesn’t enforce validation**. Validation is handled by Mongoose, which is an ODM (Object Data Modeling) library for MongoDB. In contrast, in SQL databases, we can define constraints (like `NOT NULL`, UNIQUE, or data types) at the schema/table level, and the database will reject invalid data. But in MongoDB , it doesn't validate anything by default — it accepts any structure unless validation is explicitly set

We can ensure basic validation in Mongoose using the `required` property and other schema options.

When we add validation rules in the Mongoose schema, they will be **automatically applied at the time of saving the document**.
We can also explicitly trigger validation using .validate() or .validateSync(), but it's usually not necessary unless you're manually checking before saving.

**Q**: Earlier we used Joi to validate the request. Here, we used another validator. What should we use?

**A**: Both — because:

- We should validate the request body (e.g., using Joi) when the client sends the data — this ensures that incoming data is correct before processing.

- We should also validate the data at the database layer (e.g., using Mongoose schema validation), because errors can happen at any point, and we should not rely only on client-side or request-level validation.

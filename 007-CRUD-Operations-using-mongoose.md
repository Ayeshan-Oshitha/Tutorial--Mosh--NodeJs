# Introducing MongoDB

MongoDB is a NoSQL / Document Database.

In SQL databases, we should design databases ahead of time (create schemas). But in MongoDB, we don't need to do that — we can simply store JSON objects in the database.

In MongoDB, it simply returns the JSON object, so we can transfer it — no conversion needed.

# Installing mongodb on windows

- Install MongoDB

- Add it to the PATH

- Create the C:/data/db directory as the default storage location

# Schermas

- Collection – Like a table in SQL databases

- Document – Like a row in relational databases

- Schema – Defines the shape (structure) of the data in a collection / shape of the document in a collection

- Scheman Types - String, Number, Date, Buffer, Boolean, objectID, Array

# Model

Model is created from the schema and acts as a class you use to interact with the database.( It lets you create, read, update, and delete records based on the schema)

# Querying Documents

```javascript
async function getCourses() {
  const courses_1 = await Course.find();
  console.log(courses_1);

  const courses_2 = await Course.find({ author: "Mosh", isPublished: true });
  console.log(courses_2);

  const courses_3 = await Course.find()
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses_3);
}
```

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

# Comparison Query Operator

In MongoDB, there are some operators for comparing values. Since Mongoose is built on top of the MongoDB driver, the standard operators that MongoDB understands are also available in Mongoose.

- eq – equal
- ne – not equal
- gt – greater than
- gte – greater than or equal
- lt – less than
- lte – less than or equal
- in – in
- nin – not in

```javascript
// Courses with price greater than 10 and less than or equal to 20
const courses = await Course.find({ price: { $gt10, $lte: 20 } });

// Courses with price either 10, 25, or 20
const courses = await Course.find({ price: { $in: [10, 25, 20] } });
```

# Logical Query Operators

- or — Matches documents that satisfy at least one of the given conditions.

- and — Matches documents that satisfy all the given conditions.

```javascript
// Find courses where the author is "mosh" OR the course is published
const courses = await Course.find().or([
  { author: "mosh" },
  { isPublished: true },
]);
```

# Regular Expressions

If you need more control when filtering strings (e.g., starts with, ends with, contains, case-insensitive), you can use regular expressions (RegEx).

```javascript
// Find courses where the author's name STARTS with "Mosh"
const courses = await Course.find({ author: /^Mosh/ });

// Find courses where the author's name ENDS with "Hamedani"
const courses = await Course.find({ author: /Hamedani$/ });

// Same as above but case-insensitive (e.g., matches "hamedani", "Hamedani", etc.)
const courses = await Course.find({ author: /Hamedani$/i });

// Find courses where the author's name CONTAINS "Mosh"
const courses = await Course.find({ author: /.*Mosh.*/ });
```

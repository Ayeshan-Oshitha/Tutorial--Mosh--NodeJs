# Modeling Relationship

When working with associations/relationships, we have two methods:

1. Using References (Normalization)
2. Using Embedded Documents (Denormalization)

### 1. Using References (Normalization)

```javascript
let author = {
  name: "Mosh",
};

let course = {
  author: "id", // ID of author document in authors collection
};
```

In SQL databases, there is the concept of relationships which enforces data integrity. But in NoSQL databases, we don't have relationships.

Even though we set the ID here, there is no real relationship between the above documents in the database. (In other words, we can set the ID to an invalid one, and MongoDB doesn't care about that.)

### 2. Using Embedded Documents (Denormalization)

```javascript
let course = {
  author: {
    name,
  },
};
```

Instead of having a separate collection for authors, we can embed an author document inside the course document.

Both of the above approaches are valid.

When choosing one, we should consider the **trade-off between query performance vs. consistency**.

- With the first approach (references), we get **consistency** (we have only one place to change the author's name). However, if we query a course, we need to do an **extra query** to load the related author.

- With the second approach (embedded), we can load the course and the author with a **single query**. However, if we plan to change the author's name, we have to update it in **multiple places**. If those updates are not all successful, we will have **inconsistent data** (some documents with the new author name, some with the old one).

So, the first approach gives **consistency**, while the second approach gives **performance**.

### 3. Hybrid Approach

Imagine the author has 50 properties. So, we maintain a separate collection for the author. But in the course document, we embed just a few properties.

```javascript
let author = {
  name: "Mosh",
  // 50 properties
};

let course = {
  author: {
    id: "ref",
    name: "Mosh",
    // Only 2 properties
  },
};
```

This approach **balances query performance and consistency**, but requires careful update logic to avoid inconsistencies.

# Population

```javascript
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

const courses = await Course.find().populate("author", "name -_id");
```

- If we don’t use the `.populate()` method or `populate()` with no parameters, Mongoose will only return the author’s ObjectId in the result.

- If we use `.populate("author")`, it will return the entire author document.

- If we use `.populate("author", "name")`, it will return **only the** `name` **field** of the author + `_id`.

- If we use `.populate("author", "name -\_id")`, it will return the `name` **field only and exclude** the `\_id` field.

# Embedding Documents

When embedding documents (i.e., subdocuments), they behave like normal documents in many ways. Most of the features available for regular documents—such as **validation** —are also supported for subdocuments.

**Important Notes:**

- **Subdocuments cannot be saved, updated, or deleted independently**. They must be modified through their **parent document**.

- However, you can **still update a subdocument directly** using MongoDB's $set or $unset operations(using `updateOne` method).

#### Example: Updating a Subdocument

```JAVASCRIPT
async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "John Smith",
      },
    }
  );
}
```

#### Example: Removing a Subdocument

```javascript
async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}
```

# Using an Array of SubDocuments

See the Codes

# Transactions

In **Relational Databases,** there is a concept called **Transaction**. This basically means a group of operations that should be performed as a **single unit**.

For example, when we place an order:

- The order is inserted into the Order table.

- The product count is deducted in the Product table.

So we are working with **two tables**. All these operations must be completed together. If one operation fails, **all operations should be rolled back**, and the database should return to its original state. This helps maintain **data integrity**.

But in **Mongoose (MongoDB)**, there isn’t a built-in transaction system like in relational databases. Instead, MongoDB has something called a **Two-Phase Commit**, which is more **complex** to implement manually.

But there is an **npm package called** `fawn` that gives us a way to use transaction-like behavior. Under the hood, it uses the Two-Phase Commit strategy.

Note: When using **Fawn**, we work **directly with collections**, not through Mongoose models.

```javascript
await new Fawn.Task()
  .save("rentals", rental) // working directly with collection(not models). Plural and lower case name
  .update(
    "movies",
    { _id: movie._id },
    {
      $inc: { numberInStock: -1 },
    }
  )
  .run();
```

### Latest Update - MongoDB and mongoose supports the transactions

Avoid using Fawn, as it is outdated and no longer maintained. Instead, use MongoDB transactions, which are now fully supported and provide a modern, reliable way to perform multi-document operations safely.

# ObjectID

When we create a document in MongoDB, it automatically creates a long string called an **ObjectID**.

This ObjectID has **24 characters**, and every **2 characters represent 1 byte**. So, there are a total of **12 bytes** in an ObjectID:

- First **4 bytes – Timestamp** (the time the document was created).

  With this, we don’t need to create a separate field like `createdAt`.

- Next **3 bytes – Machine identifier**

- Next **2 bytes – Process identifier**

- Last **3 bytes – Counter**

  If two documents are created in the same second, on the same machine and in the same process, their counters will be different.

This structure makes it **extremely unlikely** that MongoDB would generate duplicate ObjectIDs.

#### A quick breakdown of how many combinations are possible:

- 1 byte = 8 bits → 2^8 = 256 values

- Last 3 bytes = 24 bits → 2^24 = 16 million

#### Why doesn't MongoDB use auto-increment like SQL?

SQL databases (like SQL Server or MySQL) guarantee uniqueness using **auto-incremented IDs**. Although this guarantees uniqueness, it **hurts scalability**.

In contrast, MongoDB’s ObjectIDs are **generated by the MongoDB driver**, not by the MongoDB server. This means we **don’t have to wait** for the database to generate a new unique ID.

That’s one of the reasons applications built on top of MongoDB are **highly scalable**.

```javascript
// Explicitly generate an ObjectID
const id = new mongoose.Types.ObjectId();
```

```javascript
// Get the timestamp from the ObjectID
console.log(id.getTimestamp());
```

```javascript
// Check whether the passed string is a valid MongoDB ObjectID
mongoose.Types.ObjectId.isValid("11111");
```

# Validating ObjectID

In Joi, to validate MongoDB ObjectIDs (which are 24-character hex strings), there’s a helpful NPM package called joi-objectid.

This package adds a custom validation method to Joi so you can easily check if a given value is a valid MongoDB ObjectID.

---

# My Note

When using the **hybrid approach** in MongoDB/Mongoose (i.e., embedding part of a referenced document):

- If the **embedded document** (e.g., `customer`) has **only a few properties** (like 2–3), we can directly embed the existing schema into the parent (e.g., `rental`). This makes it simple, and all relevant data is shown when retrieving the rental.

- However, if the **original document** (e.g., `customer`) contains **many properties** (e.g., 50+ fields), it's better **not to embed the full customer schema** into `rental`. Instead, we should create a **lightweight sub-schema** (with only the necessary fields, such as `_id`, `name`, and `phone`) to embed into the rental.

This keeps the rental document clean and ensures that only the **necessary customer details are returned when querying rentals** — improving performance and clarity.

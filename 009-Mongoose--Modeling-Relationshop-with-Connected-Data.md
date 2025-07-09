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

3. Hybrid Approach

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

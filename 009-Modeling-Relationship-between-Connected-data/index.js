const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connmected to mongoDB"))
  .catch((err) => console.error("Could not CONNECT TO mongoDb "));

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

async function createAuthor(name, bio, website) {
  const author = new Author({
    name: name,
    bio: bio,
    website: website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name: name,
    author: author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourse() {
  const courses = await Course.find().populate("author", "name -_id");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

// createCourse("Node Course", "686e090f10cc47c03ad2e801");

listCourse();

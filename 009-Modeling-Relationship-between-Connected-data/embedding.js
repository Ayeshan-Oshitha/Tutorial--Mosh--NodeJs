const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connmected to mongoDB"))
  .catch((err) => console.error("Could not CONNECT TO mongoDb "));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name: name,
    author: author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourse() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Mosh Hamedani";
  course.save();
}

createCourse("Node Course", new Author({ name: "Mosh" }));

// updateAuthor("686ea327ea8de78f32d538aa");

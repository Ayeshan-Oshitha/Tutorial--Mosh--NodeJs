const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connected to MongoDB"));

// Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Model
const Course = mongoose.model("Course", courseSchema);

const course = new Course({
  name: "Angular Course",
  author: "Mosh",
  tags: ["angular", "frontend"],
  isPublished: true,
});

async function createCourse() {
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  console.log(courses);
}

async function updateCourse(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()

  const course = await Course.findById(id);
  if (!course) {
    return;
  }

  course.isPublished = true;
  course.author = "Another Author";

  // Alternative way
  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  const result = await course.save();
  console.log(result);
}

updateCourse("686b502b6d0d16ceb4a2c879");

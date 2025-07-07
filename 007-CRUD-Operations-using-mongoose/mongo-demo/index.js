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
  // Approach: Update first
  // Update directly
  // Optionally: get the updated document

  // return the result, not the updated course object
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );
  console.log(result);

  // update and return the modified course document by ID
  // const course = await Course.findByIdAndUpdate(
  //   id,
  //   {
  //     $set: {
  //       author: "Mosh",
  //       isPublished: true,
  //     },
  //   },
  //   { new: true }
  // );
  // console.log(course);
}

updateCourse("686b502b6d0d16ceb4a2c879");

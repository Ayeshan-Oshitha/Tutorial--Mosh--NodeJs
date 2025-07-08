const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connected to MongoDB"));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(v && v.length > 0);
          }, 4000);
        });
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: () => {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React Native Course",
    category: "-",
    author: "Mosh",
    tags: [],
    isPublished: true,
    price: 15,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
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
}

async function removeCourse(id) {
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

createCourse();

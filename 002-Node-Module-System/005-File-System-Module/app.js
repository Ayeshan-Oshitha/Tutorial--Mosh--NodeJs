const fs = require("fs");

// Synchronous way to read a file
const files = fs.readdirSync("./");
console.log(files);

// Asynchronous way to read a file
fs.readdir("./", function (err, files) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Result", files);
  }
});

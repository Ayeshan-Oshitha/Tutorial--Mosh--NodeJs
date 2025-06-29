var url = "http://mylogger.io/log";

function log(message) {
  // Send an HTTP request
  console.log(message);
}

module.exports.log = log;

console.log("exports:", exports);
console.log("require:", require);
console.log("module:", module);
console.log("fileName", __filename);
console.log("dirName:", __dirname);

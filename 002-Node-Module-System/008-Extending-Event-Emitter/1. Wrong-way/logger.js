const EventEmitter = require("events");
const emitter = new EventEmitter();

function log(message) {
  // Send an HTTP request
  console.log(message);

  // Raise an event
  emitter.emit("messageLogged", { id: 1, url: "http://myurl.com" });
}

module.exports.log = log;

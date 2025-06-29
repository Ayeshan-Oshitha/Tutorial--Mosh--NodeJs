const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.on("messageLogged", function (arg) {
  console.log("Listener called", arg);
});

// Arrow function syntax
// emitter.on("messageLogged", (arg) => {
//   console.log("Listener called with arrow function", arg);
// });

// Raise an event
emitter.emit("messageLogged", { id: 1, url: "http://myurl.com" });

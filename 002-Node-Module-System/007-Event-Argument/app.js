const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("messageLogged", function (arg) {
  console.log("Listener called", arg);
});

// Arrow function syntax
// emitter.on("messageLogged", (arg) => {
//   console.log("Listener called with arrow function", arg);
// });

emitter.emit("messageLogged", { id: 1, url: "http://myurl.com" });

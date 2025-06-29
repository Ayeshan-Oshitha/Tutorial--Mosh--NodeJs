// EventEmitter is a class
const EventEmitter = require("events");
// Create an instance of EventEmitter
const emitter = new EventEmitter();

// Register a listener for the 'messageLogged' event
emitter.on("messageLogged", function () {
  console.log("Listener called");
});

// Raise an event
emitter.emit("messageLogged");
// emmit means Makin a noise, produce something

// Note - Here the Order of the code is important.
// If you put the emitter.emit() before the emitter.on(), it will not work.

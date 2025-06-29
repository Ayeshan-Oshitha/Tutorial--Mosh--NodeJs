const Logger = require("./logger");

// Create a logger instance
const logger = new Logger();

// Register a listener
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("message123");

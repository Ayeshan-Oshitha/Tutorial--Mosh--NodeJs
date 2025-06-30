const http = require("http");

const server = http.createServer();

// Listen for 'connect' event
server.on("connect", (socket) => {
  console.log("New Connection");
});

// Start the server on port 3000
server.listen(3000);

console.log("Listening on port 3000");

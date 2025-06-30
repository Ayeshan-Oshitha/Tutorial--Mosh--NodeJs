const http = require("http");

// Create an HTTP server that responds with "Hello Client!" when the root URL ("/") is requested
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello Client!");
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000");

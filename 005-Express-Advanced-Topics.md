# Middlewear

One of the core concepts of Express is middleware or middleware functions. A middleware function is basically a function that takes a request object and either returns a response to the client or passes control to another middleware.

So far, our code has two middleware functions.

1. One is the route handler function (app.get('/', (req,res) => {}) Example). In Express, every route handler function is technically a middleware function because it takes a request object and sends a response to the client. So, it terminates the request-response cycle.

2. express.json() is also a middleware function. When we call the `express.json()` method, this method returns a middleware function. The job of this middleware function is to read the request and, if there is a JSON object in the body of the request, it will parse the body into a JSON object and then set the `req.body` property.

Essentially, this happens at runtime. When we receive a request on the server, that request goes through this pipeline. We call this pipeline a **request processing pipeline**. In this pipeline, we have one or more middleware functions. Each middleware function either terminates the request processing cycle by returning a response, or it will pass control to another middleware function.

<img src="./Images/image-9.png" width="600">

So, Express includes a few middleware functions by default. But we can also create custom middleware that we can put at the front of our request processing pipeline. So every request that gets into our server will go through our middleware. With this custom middleware, we can perform cross-cutting concerns like logging, authentication, authorization, etc.

# Creating Custom Middleware

When we create a custom middleware, we should normally use `next()` to pass control to the next middleware. Otherwise, the request processing cycle will terminate.

# Built-in-Middleware

In Express, there are a few built-in middleware functions:

1. **express.json()** – This parses the body of the request. If there is a JSON object in the request body, it will populate the `req.body` property.

2. **express.urlencoded()** – This is a traditional method used to parse incoming requests with URL-encoded payloads (like HTML form submissions). It extracts key-value pairs from the request body and populates the `req.body` property, similar to how `express.json()` works for JSON data.

3. **express.static()** – This middleware is used to serve static assets like CSS files, images, JavaScript files, etc. You can use it to expose a folder (like `public`) that holds all your static files.

# Third-party Middleware

There are many third-party middleware packages available for Express. You can find a list of them in the Express documentation under (Resources → Middleware).

Here are a few popular ones:

1. **Morgan** – Logs incoming HTTP requests. Useful for debugging and monitoring.

2. **Helmet** – Helps secure your app by setting various HTTP headers to protect against common web vulnerabilities.

**Note** - Don't use unnecessary middleware, because it can slow down the request processing and affect your app's performance. Only include the middleware that is essential for your application's functionality.

# Handling Rejected Promises

When using promises, it's important to always handle rejections.

- If you're using regular `.then()` syntax, make sure to include a `.catch()` block.

- If you're using `async/await`, you should wrap the code in a `try...catch` block to handle any potential errors.

Example – **UnhandledPromiseRejectionWarning** -: This warning means you used a promise but didn’t handle its rejection properly. You likely forgot to use `.catch()` (or a `try...catch` block if using async/await). If promise rejections are not handled, they can eventually crash your application.

Note - In this commit I forgot to add the next to generes API, We should add it.

# Express Error Middleware

In typical error handling, we send an error message directly in each route. However, this approach can lead to repetitive code. A better solution is to move the error-handling logic into a separate middleware function.

By doing this, if we ever need to change how errors are handled, we only need to update the logic in one place.

In Express, error-handling middleware should be registered **after all other middleware and route handlers**.

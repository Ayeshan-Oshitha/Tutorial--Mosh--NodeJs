# What is test driven developnment ?

With TDD, you write your tests, before writing the production code

### How TDD Work ?

1. Write a failing test

   - Start by writing a test for the feature or behavior you want to implement.

   - This test should fail initially because the corresponding application code doesn't exist yet.

2. Write the simplest code to make the test pass

   - Implement just enough code to make the test pass.

   - Don’t over-engineer — avoid designing unnecessary classes or methods.

   - The goal here is to get the test to pass with the minimal, working solution.

3. Refactor if necessary

   - Once the test passes, clean up your code.

   - Improve readability, remove duplication, or optimize the logic — but make sure all tests still pass.

### Benifits of TDD

- Testable source code from the beginning

- Every line of production code is fully covered by tests (we can refactor and deploy with confidence)

- Simplest implementation – TDD encourages writing only the code that’s needed, avoiding over-complication

If all the tests pass, then our application is good to go. If there’s a new business requirement, we should write the test first and then write the code again using TDD.

### What is best between test first / code first ?

It depends on the person and the situation.

In theory, TDD is more promising because of the benefits mentioned above. But in practice, sometimes it gets really complex and can slow you down. In such cases, it’s better to write code first and then add test cases afterward.

# Test Cases for Rental returns

// POST /api/returns {customerId, movieId}

- Returns 401 if client is not logged in
- Returns 400 if customerId is not provided
- returns 400 if movieId is not provided
- returns 404 if no rental founf for this customer/movie
- returns 200 if valid request
- set the return data
- calculate the rental fee
- Increase the stock
- Return the rental

- Returns 401 if client is not logged in - Don't think about auth moddleware, Just write simple passing code
- Returns 400 if customerId is not provided - Don't think about Joi, Just write simple passing code
- returns 400 if movieId is not provided - Don't think about Joi, Just write simple passing code
- returns 404 if no rental founf for this customer/movie
- returns 200 if valid request
- set the return data
- calculate the rental fee
- Increase the stock
- Return the rental

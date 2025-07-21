# Introduction

In integration testing, we test our code along with its external dependencies as a whole to ensure they work correctly together.

To write integration tests, we typically need access to a real database

# Preparing the App

In the script, if we add `jest --verbose`, it will display more detailed output, including information about each test and any failures.

# First Integration testing

To run integration tests, we use a library called **Supertest**.

For each test, we need to start the server before the test runs and close the server after the test finishes. To do this, we use `beforeEach` to start the server and `afterEach` to close it.

This way, the server is fresh for every test and properly shut down afterward.

# Populating the DB

Each test should run in complete isolation — as if it’s the only test in the world. This means:

- When a test starts, the database should be **clean (empty)**.
- If the test needs data, it should **insert it at the beginning** of that test.
- After the test finishes, it should **clean up any data it created**.

This ensures tests are repeatable, reliable, and do not interfere with each other.

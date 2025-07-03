# Synchronous vs Asynchronous Code

```Javascript
console.log('Before');
console.log('After');
```

Above is Synchronous Code. Code is executed one after the other.In **SYNCHRONOUS**, the second line waits for the first line to finish before running.

```javascript
console.log("Before");
setTimeout(() => {
  console.log("Reading a user from a database - 5S");
}, 5000);
setTimeout(() => {
  console.log("Reading a user from a database - 15s");
}, 15000);
console.log("After");
```

First, it moves to the first line and executes `console.log("Before")`. Then it moves to the second line and **schedules** it to run **after 5 seconds** — it doesn't wait. Then it moves to the third line and **schedules** it to run **after 15 seconds** — again, it doesn't wait. Then it executes the `console.log("After")`.

Then, when 5 seconds are completed, the controller comes back and **executes the first timeout**. Then, after a total of 15 seconds (10 more from now), it **executes the second timeout**.

**Note**: **Asynchronous** never means _multi-threaded_ or _concurrent_. JavaScript has only a single thread (like the single waiter in our first restaurant example).

<img src="./Images/image-10.png" width="300">

# Patterns for Dealing with Asynchronous Code

```javascript
console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    return { id: id, gitHubUsername: "mosh" };
  }, 2000);
}
```

The output of above code is

```bash
Before
undefined
After
Reading a user from a database
```

- The reason we get `undefined` is because, at the time we are calling the `getUser` function, the **result is not yet available**.

- Inside the function, we are using a 2-second `setTimeout`, so the actual result (user object) will be available **after 2 seconds**.

- But JavaScript **does not wait**. The function finishes immediately and returns **nothing**, so `user` becomes `undefined`.

Now, if we try to fix it like this:

```javascript
console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    return { id: id, gitHubUsername: "mosh" };
  }, 2000);
  return 1; // return a value immediately
}
```

Now it returns `1` immediately, so `console.log(user)` prints `1`.

```bash
Before
1
After
Reading a user from a database
```

However, this is **not the behavior we want**. We want the function to **wait** some time (like reading from a database or file), and **then return the result**.

To deal with this problem, we have 3 solutions

1. Callbacks
2. Proimniss
3. Async Await

These are ways to handle **asynchronous operations** properly in JavaScript, where you need to **wait for a result** before using it.

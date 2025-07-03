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

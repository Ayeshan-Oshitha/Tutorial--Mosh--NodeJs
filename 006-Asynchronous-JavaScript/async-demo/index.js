// console.log("Before");
// console.log("After");

const timer = setInterval(() => {
  const now = new Date();
  console.log("Tick:", now.toLocaleTimeString());
}, 1000);

console.log("Before");
setTimeout(() => {
  console.log("Reading a user from a database - 5S");
}, 5000);
setTimeout(() => {
  console.log("Reading a user from a database - 15s");
}, 15000);
console.log("After");

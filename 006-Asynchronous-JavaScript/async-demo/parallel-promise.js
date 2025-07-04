const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Asynchronous Operation 1...");
    resolve(1);
  }, 4000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Asynchronous Operation 2...");
    resolve(2);
  }, 4000);
});

Promise.all([p1, p2])
  .then((result) => console.log("Result : ", result))
  .catch((error) => console.log(error.message));

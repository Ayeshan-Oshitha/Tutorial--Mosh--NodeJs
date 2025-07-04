const p = new Promise(function (resolve, reject) {
  // Kick off some async work
  // ...

  setTimeout(() => {
    resolve({ id: 1, username: "mosh" });
    // reject(new Error('message'))
  }, 2000);
});

p.then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error.message);
});

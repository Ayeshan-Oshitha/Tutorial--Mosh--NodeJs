// Resolved Promise
const p = Promise.resolve({ id: 1, username: "mosh" });
p.then((result) => console.log(result));

// Rejected Promise
const k = Promise.reject(new Error("reason for reject"));
k.catch((error) => console.log(error));

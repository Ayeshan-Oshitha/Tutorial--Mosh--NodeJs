// Callback - Simple Example

console.log("Before");

getUser(1, function (user) {
  console.log("User :", user);
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

// Excersise

console.log("Before");
getUser(1, function (user) {
  console.log("User :", user);

  //  Get the Repositories
  getRepositories(user.gitHubUsername, function (repos) {
    console.log("Repos : ", repos);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Reading Repositories from the API");
    callback({ username: username, repositories: ["repo1", "repo2", "repo3"] });
  }, 2000);
}

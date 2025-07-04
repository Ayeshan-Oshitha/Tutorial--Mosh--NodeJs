console.log("Before");
getUser(1)
  .then((user) => getRepositories(user.gitHubUsername)) // getUser returns a user object. If successful, call getRepositories
  .then((repos) => getcommits(repos[0])) // getRepositories returns a repositories object. If successful, call getCommits
  .then((commits) => console.log("Commits", commits)) // getCommits returns commits. If successful, log them
  .catch((error) => console.log("Error :", error.message)); // // If any of the above promises fail, catch the error and log the error message
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading Repositories from the API");
      resolve({
        username: username,
        repositories: ["repo1", "repo2", "repo3"],
      });
    }, 2000);
  });
}

function getcommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading Commits from Repositories");
      resolve({ repo: repo, commits: ["commit", "commit2", "commit3"] });
    }, 2000);
  });
}

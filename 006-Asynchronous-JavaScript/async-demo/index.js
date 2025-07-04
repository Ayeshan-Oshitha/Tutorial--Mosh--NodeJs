// Callback Example

console.log("Before");
getUser(1, displayUsers);
console.log("After");

function displayUsers(user) {
  console.log("User:", user);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

// Excersise ( Example 2 )

console.log("Before");
getUser(1, getRepositories1);
console.log("After");

function getRepositories1(user) {
  getRepositories(user.gitHubUsername, getCommits1);
}

function getCommits1(repos) {
  getcommits(repo[0], displayCommits1);
}

function displayCommits1(commits) {
  console.log("Commits", commits);
}

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

function getcommits(repo, callback) {
  setTimeout(() => {
    console.log("Reading Commits from Repositories");
    callback({ repo: repo, commits: ["commit", "commit2", "commit3"] });
  }, 2000);
}

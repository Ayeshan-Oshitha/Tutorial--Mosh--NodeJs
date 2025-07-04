// Normal Code
console.log("Before");
getUser(1, function (user) {
  getRepositories(user.gitHubUsername, function (repos) {
    getcommits(repo[0], function (commits) {
      console.log("Commits", commits);
    });
  });
});
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

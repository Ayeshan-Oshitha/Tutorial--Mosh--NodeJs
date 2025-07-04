console.log("Outer Before");
async function displayCommits() {
  try {
    console.log("Inner Before");
    const user = await getUser(1);
    const repos = await getRepositories(user.username);
    const commits = await getcommits(repos[0]);
    console.log("commits :", commits);
    console.log("Inner After");
  } catch (error) {
    console.log("error : ", error);
  }
}
displayCommits();
console.log("Outer After");

function getUser(id) {
  // Mocking an asynchronous operation (e.g., reading data from an API or database)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  // Mocking an asynchronous operation (e.g., reading data from an API or database)
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
  // Mocking an asynchronous operation (e.g., reading data from an API or database)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading Commits from Repositories");
      resolve({ repo: repo, commits: ["commit", "commit2", "commit3"] });
    }, 2000);
  });
}

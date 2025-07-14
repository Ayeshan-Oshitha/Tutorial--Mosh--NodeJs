const bcrypt = require("bcrypt");

const password = "123456";

async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashed = await bcrypt.hash(password, salt);
  console.log(hashed);
}

run();

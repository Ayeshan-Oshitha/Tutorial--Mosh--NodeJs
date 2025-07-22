const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // Write the simplest code to pass the test
  res.status(401).send("Unauthorized");
});

module.exports = router;

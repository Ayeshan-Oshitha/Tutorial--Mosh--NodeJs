const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access denied. No token Provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    // Now If needed, route handlers can read the user object using req.user._id (only the details we put in the token will be available)
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;

function admin(req, res, next) {
  // Authentication middleware function already set the req.user
  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied");
  }

  next();
  // 401 - Unauthorized - Token not valid, Please try again
  // 403 - Forbidden - Don't try again. You can't accesss this resource
}

module.exports = admin;

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function auth(req, res, next) {
  const token = req.header("access_token");
  if (!token) return res.status(401).send("Not authorized");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    res.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("invalid token " + error);
  }
};

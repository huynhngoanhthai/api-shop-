const jwt = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");

exports.jwtAuth = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    throw new ApiError(401, "Not Logged In");
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Not Logged In");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, "invalid signature");
  }
};
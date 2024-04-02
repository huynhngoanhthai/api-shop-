const jwt = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");
const { ROLE_MANAGER } = require("../config/constant");

exports.checkAuthAdmin = (req, res, next) => {
    if (req.user.role != ROLE_MANAGER) throw new ApiError(403, "not permission");
    next();
};
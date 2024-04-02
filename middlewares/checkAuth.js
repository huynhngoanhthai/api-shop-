const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.checkAuth = (ROLE)=>{
    return (req, res, next) => {
        if (req.user.role != ROLE) throw new ApiError(403, "not permission");
        next();
    };
}

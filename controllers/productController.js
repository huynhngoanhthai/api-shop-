const catchAsync = require("../middlewares/catchAsync");
const mysql = require("../config/mysql");
const ApiError = require("../utils/ApiError");

exports.getAllProduct = catchAsync(async (req, res, next) => {
    mysql.query("SELECT * FROM products;", (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        console.log(result);
        res.json({ success: true, data: result });
    });
});
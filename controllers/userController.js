const catchAsync = require("../middlewares/catchAsync");
const mysql = require("../config/mysql");
const ApiError = require("../utils/ApiError");
const { sign } = require("jsonwebtoken");

exports.getAllUser = catchAsync(async (req, res, next) => {
    mysql.query("SELECT * FROM users;", (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        console.log(result);
        res.json({ success: true, data: result });
    });
});
exports.postCreateUser = catchAsync(async (req, res, next) => {
    const { username, password, email, age, address, phone } = req.body;
    const role = req.body?.role ? req.body?.role : ''
    mysql.query("call sp_create_user(?, ?, ?, ?, ?, ?, ?);", [username, password, email, age, address, phone, role], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        console.log(result);
        res.json({ success: true, data: result[0] });
    });
})
exports.LoginUser = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    mysql.query("call shopAPI.sp_login_user(?, ?);", [username, password], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        console.log(result);
        // const token = sign(
        //     {
        //         email: existedUser.email,
        //         password: existedUser.password, //password hashed
        //         name: existedUser.name,
        //         role: existedUser.role,
        //     },
        //     JWT_SECRET,
        //     { expiresIn: "1h" }
        // );
        // res.json({
        //     success: true,
        //     token: token,
        //     user: req.user,
        // });
        res.json({ success: true, data: result[0] });
    });
})
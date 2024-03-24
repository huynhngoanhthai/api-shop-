const catchAsync = require("../middlewares/catchAsync");
const mysql = require("../config/mysql");
const ApiError = require("../utils/ApiError");
const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constant");
const redis = require("redis");
const redisClient = redis.createClient();
const DEFAULT_EXPIRATION = 60;

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
    await redisClient.get(`blacklist-user?${username}`, async (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        else if (result) return next(new ApiError(400, "user blocked"));
    });
    mysql.query("call shopAPI.sp_login_user(?,?);", [username, password], (error, result) => {
        if (error) {
            // console.log(error.message.split(':')[1].trim());
            if (error.message.split(':')[1].trim() >= 5) {
                // console.log("run--");
                redisClient.setex(`blacklist-user?${username}`, DEFAULT_EXPIRATION, JSON.stringify(username, password))
            }
            return next(new ApiError(400, "username or password wrong"));
        }
        console.log(result);
        user = {
            username: result[0][0]?.username,
            role: result[0][0]?.role
        }
        const token = sign(
            user,
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({
            success: true,
            token: token,
            user
        });
    });
})
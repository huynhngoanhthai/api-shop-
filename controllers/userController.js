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
        return res.json({ success: true, data: result });
    });
});
exports.postCreateUser = catchAsync(async (req, res, next) => {
    const { username, password, email, age, address, phone } = req.body;
    const role = req.body?.role ? req.body?.role : ''
    mysql.query("call sp_create_user(?, ?, ?, ?, ?, ?, ?);", [username, password, email, age, address, phone, role], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        console.log(result);
        return res.json({ success: true, data: result[0] });
    });
})
exports.LoginUser = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    redisClient.get(`blacklist-user?${username}`, async (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        if (result) return next(new ApiError(400, "user blocked"));

        mysql.query("CALL shopAPI.sp_login_user(?, ?);", [username, password], (error, result) => {
            if (error) {
                if (error.message.split(':')[1].trim() >= 5) {
                    redisClient.setex(`blacklist-user?${username}`, DEFAULT_EXPIRATION, JSON.stringify(username, password));
                }
                return next(new ApiError(400, "username or password wrong"));
            }
            // console.log(result[0][0]);
            const user = {
                user_id: result[0][0]?.id,
                username: result[0][0]?.username,
                role: result[0][0]?.role
            };
            const token = sign(
                user,
                JWT_SECRET,
                { expiresIn: "1h" }
            );
            return res.json({
                success: true,
                token: token,
                user: user
            });
        });
    });
});

exports.uploadAvatar = catchAsync(async (req, res, next) => {
    const avatar = req?.file?.filename; 
    const user_id = req?.user?.user_id;
    mysql.query("call shopAPI.sp_upload_avatar(?, ?); ", [user_id,avatar] , async(error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    })
});
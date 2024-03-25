const catchAsync = require("../middlewares/catchAsync");
const mysql = require("../config/mysql");
const ApiError = require("../utils/ApiError");
const { ROLE_MANAGER } = require("../config/constant");

exports.getProducts = catchAsync(async (req, res, next) => {
    const search = req.query?.search || null;
    console.log(search);
    mysql.query("call shopAPI.sp_get_products(?);", [search], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        res.json({ success: true, data: result[0] });
    });
});

// need middleware auth 
exports.createProduct = catchAsync(async (req, res, next) => { 
    const { name, description, price, quantity } = req.body;
    const user = req.user;
    if (user.role != ROLE_MANAGER)  throw new ApiError(401, "invalid signature");     
    mysql.query("call sp_create_product(?,?,?,?)", [name, description, price, quantity], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        res.json({ success: true, data: result[0] })
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const { id, name, description, price, quantity } = req.body;
    const user = req.user;
    if (user.role != ROLE_MANAGER)  throw new ApiError(401, "invalid signature");     
    mysql.query("call sp_update_product(?,?,?,?)", [id, name, description, price, quantity], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        res.json({ success: true, data: result[0] })
    });

});
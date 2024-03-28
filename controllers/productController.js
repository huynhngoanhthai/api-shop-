const catchAsync = require("../middlewares/catchAsync");
const mysql = require("../config/mysql");
const ApiError = require("../utils/ApiError");
const { ROLE_MANAGER } = require("../config/constant");

exports.getProducts = catchAsync(async (req, res, next) => {
    const search = req.query?.search || null;
    console.log(search);
    mysql.query("call shopAPI.sp_get_products(?);", [search], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    });
});

// need middleware auth 
// add recept
exports.createProduct = catchAsync(async (req, res, next) => {
    const { name, description, price, quantity } = req.body;
    const user = req.user;
    if (user.role != ROLE_MANAGER) throw new ApiError(403, "Unauthorized Access");
    mysql.query("call sp_create_product(?,?,?,?)", [name, description, price, quantity], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] })
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const user = req.user;
    if (user.role != ROLE_MANAGER) throw new ApiError(403, "Unauthorized Access");
    mysql.query("call sp_update_product(?,?,?,?)", [id, name, description, price, quantity], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] })
    });
});

exports.getProductDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    mysql.query("call sp_get_product_detail(?)", [id], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] })
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    if (user.role != ROLE_MANAGER) throw new ApiError(403, "Unauthorized Access");
    mysql.query("call sp_delete_product(?)", [id], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] })
    });
});

exports.updateImageProduct = catchAsync(async (req,res, next) => {

});

exports.historyStatisticsProduct = catchAsync(async(req,res,next) => {

});
// manager categories
exports.getCategories = catchAsync(async(req,res,next) => {

});
exports.getCategoryDetail = catchAsync(async(req,res,next) => {

});
exports.updateCategory = catchAsync(async(req,res,next) => {

});
exports.deleteCategory = catchAsync(async(req,res,next) => {

});
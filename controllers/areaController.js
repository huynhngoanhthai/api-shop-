const catchAsync = require("../middlewares/catchAsync");
const mysql = require("../config/mysql");
const { QUERY_GET_AREAS } = require("../config/constant");
const ApiError = require("../utils/ApiError");
// manager  area
exports.getAreas = catchAsync(async (req, res, next) => {
    mysql.query(QUERY_GET_AREAS, (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        // console.log(result);
        return res.json({ success: true, data: result[0] });
    })
});
exports.createArea = catchAsync(async (req, res, next) => {
    console.log(req.user);
    const { name } = req.body;
    mysql.query("INSERT INTO `shopAPI`.`areas` (`name`) VALUES (?);", [name], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    })
});
exports.deleteArea = catchAsync(async (req, res, next) => {
    
});
exports.updateArea = catchAsync(async (req, res, next) => {

});
// manager tables
exports.getTables = catchAsync(async (req, res, next) => {

});
exports.createTable = catchAsync(async (req, res, next) => {

});
exports.deleteTable = catchAsync(async (req, res, next) => {

});
exports.updateTable = catchAsync(async (req, res, next) => {

});
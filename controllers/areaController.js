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
    });
});
exports.createArea = catchAsync(async (req, res, next) => {
    // console.log(req.user);
    const { name } = req.body;
    // update sp 
    mysql.query("INSERT INTO `shopAPI`.`areas` (`name`) VALUES (?);", [name], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    });
});
exports.deleteArea = catchAsync(async (req, res, next) => {
    const id = Number(req.params.id);
    // update sp 
    mysql.query("DELETE FROM shopAPI.areas WHERE id = ?;", [id], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    });
});
exports.updateArea = catchAsync(async (req, res, next) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    mysql.query("UPDATE `shopAPI`.`areas` SET name = ? WHERE id = ?;", [name, id], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    });

});

// manager tables
exports.getTables = catchAsync(async (req, res, next) => {
    const { id } = Number(req.params.id);
    // update sp
    mysql.query("SELECT * FORM tables WHERE id_area = ?", [id], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    });

});
exports.createTable = catchAsync(async (req, res, next) => {
    const { id_area } = Number(req.params.id);
    const { name, seat, status } = req.body;
    // update sp
    mysql.query("INSERT INTO shopAPI.tables (name,seat,status,id_area) VALUES (?,?,?,?);", [name, seat, status, id_area], (error, result) => {
        if (error) return next(new ApiError(400, error.message));
        return res.json({ success: true, data: result[0] });
    });

});
exports.deleteTable = catchAsync(async (req, res, next) => {

});
exports.updateTable = catchAsync(async (req, res, next) => {

});
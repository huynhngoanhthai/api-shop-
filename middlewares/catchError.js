const catchError = (err, req, res, next) => {
    console.log(JSON.stringify(err, null, 2));
    
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  };
  module.exports = catchError;
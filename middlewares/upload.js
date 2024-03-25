const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/ApiError");


// path file upload
//name file uploaded
const fileFilter = (req, file, cb) => {
  const allowExtension = [".jbg", ".png", ".gif", ".jpeg",".jpg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowExtension.join("|")})$`, "i");
  if (regex.test(fileExtension)) cb(null, true);
  else cb(new ApiError(400,"it isn't image"), false);

// cb(null,true)
};

const createStorage = (destinationPath) => {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/' + destinationPath));
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
      },
    });
  };

const createMulterMiddleware = (destinationPath) => {
    const storage = createStorage(destinationPath);
    return multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
  };

module.exports = createMulterMiddleware;
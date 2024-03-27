const { Router } = require("express");
const mysql_userController = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const createMulterMiddleware = require("../middlewares/upload");
const router = Router();

router.get("/", jwtAuth, mysql_userController.getAllUser);
router.post("/register", mysql_userController.postCreateUser);
router.post("/login", mysql_userController.LoginUser);
router.patch("/upload/avatar", jwtAuth, createMulterMiddleware('avatar').single('file'), mysql_userController.uploadAvatar);
router.delete("/delete/:id", jwtAuth, mysql_userController.deleteUser);
router.patch("/update", jwtAuth, mysql_userController.updateUser);
module.exports = router;
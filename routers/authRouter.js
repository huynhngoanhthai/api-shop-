const { Router } = require("express");
const mysql_userController = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = Router();

// router.get("/",jwtAuth, mysql_userController.getAllUser);
router.post("/register", mysql_userController.postCreateUser);
router.post("/login", mysql_userController.LoginUser);
// router.delete("/:id", mysql_userController.deleteUser);
// router.patch("/:id", mysql_userController.updateUser);
module.exports = router;
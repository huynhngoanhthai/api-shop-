const { Router } = require("express");
const mysql_userController = require("../controllers/userController");
const router = Router();

router.get("/", mysql_userController.getAllUser);
router.post("/", mysql_userController.postCreateUser);
router.post("/login", mysql_userController.LoginUser);
// router.delete("/:id", mysql_userController.deleteUser);
// router.patch("/:id", mysql_userController.updateUser);
module.exports = router;
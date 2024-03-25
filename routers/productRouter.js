const { Router } = require("express");
const mysql_productController = require("../controllers/productController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const productRouter = Router();

productRouter.get("/", mysql_productController.getProducts);

module.exports = productRouter;
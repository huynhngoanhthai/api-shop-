const { Router } = require("express");
const mysql_productController = require("../controllers/productController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const productRouter = Router();

productRouter.get("/", mysql_productController.getProducts);
productRouter
    .route("/:id")
    .get(mysql_productController.getProductDetail)
    .delete(jwtAuth, mysql_productController.deleteProduct)
    .patch(jwtAuth, mysql_productController.updateProduct);

productRouter.post("/", mysql_productController.getProducts);


module.exports = productRouter;
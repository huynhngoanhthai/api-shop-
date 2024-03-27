const { Router } = require("express");
const mysql_productController = require("../controllers/productController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const productRouter = Router();

productRouter.route("/")
    .get( mysql_productController.getProducts)
    .post(jwtAuth, mysql_productController.createProduct);

productRouter
    .route("/:id")
    .get(mysql_productController.getProductDetail)
    .delete(jwtAuth, mysql_productController.deleteProduct)
    .patch(jwtAuth, mysql_productController.updateProduct);



module.exports = productRouter;
const { Router } = require("express");
const orderController = require("../controllers/orderController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const orderRouter = Router();

// orderRouter.route("/")
//     .get( mysql_productController.getProducts)
//     .post(jwtAuth, mysql_productController.createProduct);

// orderRouter
//     .route("/:id")
//     .get(mysql_productController.getProductDetail)
//     .delete(jwtAuth, mysql_productController.deleteProduct)
//     .patch(jwtAuth, mysql_productController.updateProduct);



module.exports = orderRouter;
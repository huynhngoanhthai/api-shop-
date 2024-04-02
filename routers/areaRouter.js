const { Router } = require("express");
const areaController = require("../controllers/areaController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const areaRouter = Router();

areaRouter.route("/")
    .get(jwtAuth, areaController.getAreas)
    .post(jwtAuth,areaController.createArea);




module.exports = areaRouter;
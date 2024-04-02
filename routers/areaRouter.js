const { Router } = require("express");
const areaController = require("../controllers/areaController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { checkAuth } = require("../middlewares/checkAuth");
const { ROLE_MANAGER } = require("../config/constant");
const areaRouter = Router();

areaRouter.route("/")
    .get(jwtAuth, areaController.getAreas)
    .post(jwtAuth, areaController.createArea);

areaRouter.route("/:id")
    .delete(jwtAuth, checkAuth(ROLE_MANAGER), areaController.deleteArea)
    .patch(jwtAuth, checkAuth(ROLE_MANAGER), areaController.updateArea);


areaRouter.route("/:id/tables")
    .get(jwtAuth, areaController.getTables)
    .post(jwtAuth, checkAuth(ROLE_MANAGER), areaController.createTable);

areaRouter.route("/:id/tables/:id_table")



module.exports = areaRouter;
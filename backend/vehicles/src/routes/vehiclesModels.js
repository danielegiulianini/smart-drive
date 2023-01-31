const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const VehicleModelsController = require("../controllers/vehicleModels");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//no delete nor post

//router;
// .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //not needed here

router
  .route("/vehiclesModels/productionYears/")
  .get(VehicleModelsController.getYears);

router
  .route("/vehiclesModels/makes/")
  .get(VehicleModelsController.getMakes); //todo: check query params not null (as a middleware)

router
  .route("/vehiclesModels/models/")
  .get(VehicleModelsController.getModels); //todo: check query params not null

router
  .route("/vehiclesModels/series/")
  .get(VehicleModelsController.getSeries); //todo: check query params not null (either one of the 2)

router
  .route("/vehiclesModels/vehicleDetails/:vehicleId")
  .get(VehicleModelsController.getVehiclesDetails); //todo: check query params not null (either one of the 2)

module.exports = router;

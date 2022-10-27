const express = require("express");
const router = express.Router();

//const AuthMiddleware = require("./../middlewares/auth");
const VehicleModelsController = require("../controllers/vehicleModels");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//no delete nor post

router
 // .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //not needed here 
  .route("/vehiclesModels/productionYears/")
  .get(VehicleModelsController.getYears);

router
//  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/makes/")
  .get(VehicleModelsController.getMakes); //todo: check query params not null (as a middleware)

router
 // .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/models/")
  .get(VehicleModelsController.getModels); //todo: check query params not null

router
//  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/series/")
  .get(VehicleModelsController.getSeries); //todo: check query params not null (either one of the 2)

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/vehicleDetails/:vehicleId")
  .get(VehicleModelsController.getVehiclesDetails); //todo: check query params not null (either one of the 2)


  module.exports = router;

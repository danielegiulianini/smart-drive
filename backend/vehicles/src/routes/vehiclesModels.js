const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const VehicleModelsController = require("../controllers/vehicleModels");



//router;
// .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //not needed here

router
  .route("/vehiclesModels/productionYears/")
  .get(VehicleModelsController.getYears);

router
  .route("/vehiclesModels/makes/")
  .get(VehicleModelsController.getMakes);

router
  .route("/vehiclesModels/models/")
  .get(VehicleModelsController.getModels); 

router
  .route("/vehiclesModels/series/")
  .get(VehicleModelsController.getSeries); 

router
  .route("/vehiclesModels/vehicleDetails/:vehicleId")
  .get(VehicleModelsController.getVehiclesDetails);

module.exports = router;

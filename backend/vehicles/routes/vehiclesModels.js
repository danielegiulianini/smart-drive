//maybe to change in vehicleModels

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const ProfileController = require("../controllers/users");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//no delete nor post


//vehicle models
router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehicleModels/:vehicleId")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/productionYears/")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/makes/")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/models/")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/series/")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehiclesModels/vehicleDetails/:vehicleId")
  .get(ProfileController.get);

//vehicle instance
router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/:vin")
  .get(ProfileController.getAll);

module.exports = router;

//vehicle instance
const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const UserVehiclesController = require("../controllers/userVehicles");

//get all the associations

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/")
  .get(UserVehiclesController.getAll);

//get a specific association

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/:vin")
  .get(UserVehiclesController.get);

//create an association

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/")
  .post(UserVehiclesController.create);

//edit an association

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/:vin")
  .post(UserVehiclesController.edit);
//delete an association

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/:vin")
  .delete(UserVehiclesController.remove);


  module.exports = router;

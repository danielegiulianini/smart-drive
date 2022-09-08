//maybe to change in vehicleModels

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const ProfileController = require("../controllers/users");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//no delete nor post

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/vehicleModels/:userId")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/userVehicles/:userId")
  .get(ProfileController.getAll);

module.exports = router;

//vehicle instance
const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const UserVehiclesController = require("../controllers/userVehicles");

//router.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody);

//get all the associations
router.route("/userVehicles/").get(UserVehiclesController.getAll);

//get a specific association
router.route("/userVehicles/:_id").get(UserVehiclesController.get);

//create an association
router.route("/userVehicles/").post(UserVehiclesController.create);

//edit an association
router.route("/userVehicles/:_id").post(UserVehiclesController.edit);

//delete an association
router.route("/userVehicles/:_id").delete(UserVehiclesController.remove);

module.exports = router;

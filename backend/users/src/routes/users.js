const express = require("express");

const AuthMiddleware = require("./../middlewares/auth");
const ProfileController = require("../controllers/users");

const router = express.Router();

//router.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post because with supabase you have set it already

router.route("/").post(ProfileController.create);

router
  .route("/:userId")
  .get(ProfileController.get)
  .post(ProfileController.edit);

router.route("/").get(ProfileController.list);

module.exports = router;


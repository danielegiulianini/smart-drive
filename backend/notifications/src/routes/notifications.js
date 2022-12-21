//only a getall with wuery params (pushing internall y8with mqtt)

const express = require("express");

const AuthMiddleware = require("./../middlewares/auth");
const NotificationController = require("../controllers/notifications");

const router = express.Router();

//router.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already

router.route("/").post(NotificationController.create);

router.route("/:notificationId").post(NotificationController.edit);

router.route("/").get(NotificationController.list);

module.exports = router;

const express = require("express");

const AuthMiddleware = require("./../middlewares/auth");
const ProfileController = require("../controllers/users");

const router = express.Router();

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//router.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already

router.route("/").post(ProfileController.create);

router
  .route("/:userId")
  .get(ProfileController.get)
  .post(ProfileController.edit);

router.route("/").get(ProfileController.list);

//delete?

module.exports = router;

/* alternative syntax (finer auth check):
router.post('/signup',userControllers.userRegister);
router.get('/me', checkAuth, userControllers.getMe);
router.get('/me', checkAuth, userControllers.getMe);
*/

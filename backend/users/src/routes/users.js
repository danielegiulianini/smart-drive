const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const ProfileController = require("../controllers/users");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

router
 // .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already
  .route("/")
  .post(ProfileController.create);

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/:userId")
  .get(ProfileController.get);

  router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/")
  .get(ProfileController.list);

router
 // .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/:userId")
  .put(ProfileController.edit);

//delete?

module.exports = router;

/* alternative syntax:
router.post('/signup',userControllers.userRegister);
router.get('/me', checkAuth, userControllers.getMe);
router.get('/me', checkAuth, userControllers.getMe);
*/

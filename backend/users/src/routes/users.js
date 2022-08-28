const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./middleware/auth");
const ProfileController = require("../controllers/users");

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for every path? yes, because with firebase you have set it already
  .route("/")
  .post(ProfileController.create);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) 
  .route("/:userId")
  .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/:userId")
  .put(ProfileController.edit);

module.exports = router;

/* alternative syntax:
router.post('/signup',userControllers.userRegister);
router.get('/me', checkAuth, userControllers.getMe);
router.get('/me', checkAuth, userControllers.getMe);
*/

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const TripsController = require("../controllers/trips");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//routes' base url: images/api/v1/

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/")
  .get(TripsController.getAll);

//get single trip? yes, for detail
router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody)
  .route("/:id")
  .get(TripsController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already
  .route("/")
  .post(TripsController.create);

//should prefer a PUT (idempotency gratis, but cors complicated)
router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already
  .route("/")
  .post(TripsController.create);

//delete?

module.exports = router;

/* alternative syntax:
router.post('/signup',userControllers.userRegister);
router.get('/me', checkAuth, userControllers.getMe);
router.get('/me', checkAuth, userControllers.getMe);
*/

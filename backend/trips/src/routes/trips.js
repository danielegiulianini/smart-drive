const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const TripsController = require("../controllers/trips");


//routes' base url: trips/api/v1/

/*router
  .use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already*/

router
  .route("/")
  //here calling validators
  .get(TripsController.getAll);

//get single trip? yes, for detail
router
  .route("/:tripId")
  //here calling validators
  .get(TripsController.get);

//write API
router
  .route("/")
  //here calling validators
  .post(TripsController.create);

//PATCH (no need in REST to send all the resource but cors complicated), PUT (idempotency gratis but cors
//complicated). So, post.
router
  .route("/:tripId")
  //here calling validators
  .post(TripsController.close);


module.exports = router;

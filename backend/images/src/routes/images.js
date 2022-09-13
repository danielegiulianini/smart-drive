const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const ImageController = require("../controllers/images");
const ImageService = require("../services/images.upload");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers)

//routes' base url: images/

const imagesDestinationFolder = require("./../config/images.config");
console.log("limage dest folder is: >>>>>>>>>>>>>>" + imagesDestinationFolder);

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) commented for testing
  .route("/")
  .get(function (req, res, next) {
    console.log("received get request");
    console.log("Request URL:", req.originalUrl);
    next();
  }, express.static(imagesDestinationFolder));

//routes for other image info (date of creation...)

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too? yes, because with supabase you have set it already
  .route("/")
  .post(function (req, res, next) {
    //debugging middleware
    console.log("received post request");
    next();
  }, ImageController.storeImage);


//delete?

module.exports = router;

/* alternative syntax:
router.post('/signup',userControllers.userRegister);
router.get('/me', checkAuth, userControllers.getMe);
router.get('/me', checkAuth, userControllers.getMe);
*/

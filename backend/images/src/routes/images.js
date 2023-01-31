const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const ImageController = require("../controllers/images");
const ImageService = require("../services/images.upload");

//TODO: instead of the controller's handler (directly) could bind to the path an action method that
//does some prints (so removing them from tha handlers) about what method is being called

//routes' base url: images/

var path = require("path");

//leveraging __dirname for preventing that running the express app from another directory from
//the one of index.js breaks paths
const imagesDestinationFolder = path.join(
  __dirname,
  require("./../config/images.config")
);

console.log("the image destination folder: ", imagesDestinationFolder);

router.get(function (req, res, next) {  //10/1/22 before there was a use instead of a get
  console.log("get request for image arrived!");
  console.log(req.originalUrl);
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

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/auth");
const ImageController = require("../controllers/images");

//routes' base url: images

var path = require("path");

//leveraging __dirname for preventing that running the express app from another directory from
//the one of index.js breaks paths
const imagesDestinationFolder = path.join(
  __dirname,
  require("./../config/images.config")
);

router.route("/:id").get(function (req, res, next) {
  console.log("get request for image arrived!");
  console.log(req.originalUrl);
  next();
}, express.static(imagesDestinationFolder));

router
  //.use(AuthMiddleware.extractUserIdFromTokenAndPutItToBody) //set up middleware for post too because with supabase you have set it already
  .route("/")
  .post(function (req, res, next) {
    //debugging middleware
    console.log("received post request");
    next();
  }, ImageController.storeImage);

module.exports = router;

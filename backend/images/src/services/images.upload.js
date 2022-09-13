const { Image } = require("../models/images");
const { ok, badRequest } = require("../utils/actionsResponses");

const supportedMimeTypes = [
  "image/jpeg",
  "image/bmp",
  "image/gif",
  "image/png",
  "image/tiff",
];

const imageInputName = "imageToUpload"; //NAME (html attribute!) OF THE INPUT CONTAINING THE IMAGE IN THE HTML! could go in config

function imageRelativeUrlFromFile(file) {
  path = require("path");
  return Date.now() + path.extname(file.originalname);
}

function imageCompleteUrlFromFile(file) {
  const baseMicroserviceUrl = "api/v1/images/"; //when updating this must update routes/index.js and index.js in root too
  return baseMicroserviceUrl + imageRelativeUrlFromFile(file);
}

const multer = require("multer");

const imagesDestinationFolder = "./uploads";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDestinationFolder);
  },
  filename: function (req, file, cb) {
    console.log(file);
    file.url = imageCompleteUrlFromFile(file);
    cb(null, imageRelativeUrlFromFile(file)); // file.originalname
  },
});
var upload = multer({ storage: storage });

const singleFileUpload = upload.single(imageInputName);

module.exports = {
  singleFileUpload,
};

//not actually needed (used express.public instead)
function getImage() {
  //must read from file system
  //must return as JsonResult
}

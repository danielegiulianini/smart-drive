const { Image } = require("../models/images");

const supportedMimeTypes = [
  "image/jpeg",
  "image/bmp",
  "image/gif",
  "image/png",
  "image/tiff",
];

const imageInputName = "imageToUpload"; //NAME (html attribute!) OF THE INPUT CONTAINING THE IMAGE IN THE HTML!

function imageRelativeUrlFromFile(file) {
  path = require("path");
  return Date.now() + path.extname(file.originalname);
}

function imageCompleteUrlFromFile(file) {
  const baseMicroserviceUrl = "api/v1/images/"; //when updating this must update routes/index.js and index.js in root too
  const relativeUrl = imageRelativeUrlFromFile(file);
  return {
    completeUrl: baseMicroserviceUrl + relativeUrl,
    relativeUrl: relativeUrl,
  };
}

const multer = require("multer");

const imagesDestinationFolder = "./uploads";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDestinationFolder);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const url = imageCompleteUrlFromFile(file);
    file.url = url.completeUrl;
    cb(null, url.relativeUrl); //instead of file.originalname
  },
});
var upload = multer({ storage: storage });

const singleFileUpload = upload.single(imageInputName);

module.exports = {
  singleFileUpload,
};

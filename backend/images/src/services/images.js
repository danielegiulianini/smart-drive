const { Image } = require("../models");
const { ok, badRequest } = require("../utils/action-results");

const supportedMimeTypes = [
  "image/jpeg",
  "image/bmp",
  "image/png",
  "image/tiff",
  "image/gif",
];

const imagesDestinationFolder = "./uploads/";
const imageInputName = ""; //NAME (html attribute!) OF THE INPUT CONTAINING THE IMAGE!

async function storeImage(file) {
  if (!supportedMimeTypes.includes(file.mimetype)) {
    return { error: "Unsupported mime type" };
  }

  const thisImageUrl = imageUrl(file);

  //register image (mime) to file system
  storeImageToFileSystem(thisImageUrl);

  //register mime type on db
  let imageModel = new Image({
    mime: file.mimetype,
  });
  await imageModel.save();

  return { thisImageUrl };
}

function storeImageToFileSystem(file) {
  const multer = require("multer");

  const storage = multer.diskStorage({
    destination: imagesDestinationFolder,
    filename: function (req, file, cb) {
      cb(null, thisImageUrl);
    },
  });
  const diskStorage = multer({ storage: storage });
  diskStorage.single(imageInputName);
}

function imageUrl(file) {
  path = require("path");
  return Date.now() + path.extname(file.originalname);
}

module.exports = {
  storeImage,
  imageUrl,
};

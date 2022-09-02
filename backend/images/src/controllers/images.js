const imageService = require("../services/users");

const { imageResult, notFound } = require("../utils/action-results");
const { Image } = require("../models");

exports.getImage = async function (req) {
  //retrieve mimetype from db
  let image = await Image.findById(req.params.id);
  if (!image) {
    return notFound(`Could not find an image with id ${req.params.id}`);
  }
  //retrieve actual image from file system
  //...
  if (!image) {
    return notFound(`Could not find an image with id ${req.params.id}`);
  }
  return imageResult(image.data, image.mime);
};

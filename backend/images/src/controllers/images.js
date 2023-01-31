const imageService = require("../services/images.upload");
const { imageResult, notFound } = require("../utils/actionsResponses");

const storeImage = (req, res) => {
  imageService.singleFileUpload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong in uploading image!"); //error is set by multer
    }
    console.log("in storeImage responding with ", req.file.url);
    res.send("http://localhost:8082/" + req.file.url); //return to user the image uri (absolute, not relative)
  });
};

/* not handled here but with express.public middleware: 
const getImage = async function (req) {
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
};*/

module.exports = {
  storeImage,
};

/*
const create = async (req, res) => {
  //req has image file inside!
  imageService
    .storeImage(imagesDestinationFolder)
    .then((imageUrl) => res.status(201).json(imageUrl)) //todo actions to be refactored since reused
    .catch((err) => {
      res.status(400).json(err);
      console.log("error occurred while storing image");
    });
};*/

//const myFc = imageService.myF;

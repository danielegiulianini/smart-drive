const imageService = require("../services/images.upload");

const storeImage = (req, res) => {
  imageService.singleFileUpload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong in uploading image!"); //error is set by multer
    }
    console.log("in storeImage responding with ", req.file.url);
    res.send("http://localhost:8082/" + req.file.url); //return to user the image uri (absolute, not relative)
  });
};

/* images CRUD not handled here but with express.public middleware:*/

module.exports = {
  storeImage,
};

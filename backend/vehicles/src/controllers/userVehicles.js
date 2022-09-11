const userVehiclesService = require("../services/userVehicles");
const pick = require("../utils/jsObjectUtils");

//post an association
const create = async (req, res) => {
  //userVehicles params:
  /*
  _id,
  vehicleModelId,
  pictureUri,
  createdAt,
  updatedAt
}));
*/
  //filtering params contained in client's post request (can use pick too)
  let params = {
    vehicleIdentificationNumber: req.body.vin,
    vehicleModelId: req.body.vehicleModelId,
    pictureUri: req.body.pictureUri,
  };

  userVehiclesService
    .add(params)
    .then((profile) => res.status(201).json(profile)) //todo actions to be refactored since reused
    .catch((err) => res.status(400).json(err));
};

//get all the associations (with filter on userId (query param))
const getAll = async (req, res) => {
  console.log("(1)the userId passed is " + req.query.userId);

  userVehiclesService
    .list(req.query.userId)
    .then((f) => res.status(200).json(f))
    .catch((err) => res.status(400).json(err));
};

//get a specific association (with filter on vin (req param))
const get = (req, res) => {
  const vin = req.params.vin;
  console.log("(1)the vin passed is " + vin);

  userVehiclesService
    .get(vin)
    .then((userVehicle) => res.status(200).json(userVehicle))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

//edit an association (with filter on vin (req param))
const edit = async (req, res) => {
  //filtering params contained in client's post request (can use pick too)
  const vin = req.params.vin;
  let params = {
    vehicleModelId: req.body.vehicleModelId,
    pictureUri: req.body.pictureUri,
  };

  userVehiclesService
    .edit(vin, params)
    .then((userVehicle) => res.status(200).json(userVehicle))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

//delete an association (with filter on vin (req param))
const remove = async (req, res) => {
  //checking for unauthorized?
  const vin = req.params.vin;

  userVehiclesService
    .remove(vin)
    .then((userVehicle) => res.status(200).json(userVehicle))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  get,
  getAll,
  edit,
  remove,
};

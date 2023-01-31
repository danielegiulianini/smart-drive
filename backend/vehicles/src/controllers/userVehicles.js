const userVehiclesService = require("../services/userVehicles");
const pick = require("../utils/jsObjectUtils");

//post an association
const create = async (req, res) => {
  //filtering params contained in client's post request (can use pick too)
  let params = {
    _id: req.body._id, //vehicleIdentificationNumber: req.body.vin,
    vehicleModelId: req.body.vehicleModelId,
    userId: req.body.userId,
    pictureUri: req.body.pictureUri,
  };

  userVehiclesService
    .add(params)
    .then((profile) => res.status(201).json(profile)) //todo actions to be refactored since reused
    .catch((err) => res.status(400).json(err));
};

//get all the associations (with filter on userId (query param))
const getAll = async (req, res) => {
  console.log("(1)the query passed is");
  console.log(req.query);

  userVehiclesService
    .list(req.query)
    .then((f) => res.status(200).json(f))
    .catch((err) => res.status(400).json(err));
};

//get a specific association (with filter on vin (req param))
const get = (req, res) => {
  const _id = req.params._id; // const vin = req.params.vin;
  console.log("(1)the vin passed is " + _id);

  userVehiclesService
    .get(_id)
    .then((userVehicle) => res.status(200).json(userVehicle))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

//edit an association (with filter on vin (req param))
const edit = async (req, res) => {
  //filtering params contained in client's post request (can use pick too)
  const _id = req.params._id; // const vin = req.params.vin;
  let params = {
    vehicleModelId: req.body.vehicleModelId,
    pictureUri: req.body.pictureUri,
    retired: req.body.retired,
  };

  userVehiclesService
    .edit(_id, params)
    .then((userVehicle) => res.status(200).json(userVehicle))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

//delete an association (with filter on vin (req param))
const remove = async (req, res) => {
  //checking for unauthorized? (rbac access control)
  const _id = req.params._id; // const vin = req.params.vin;

  userVehiclesService
    .remove(_id)
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

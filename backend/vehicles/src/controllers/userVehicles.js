const userVehiclesService = require("../services/userVehicles");
const pick = require("../utils/pick");

//post an association
const create = async (req, res) => {
  //userVehicles params:
  /*
  vehicleIdentificationNumber,
  vehicleModelId,
  pictureUri,
  createdAt,
  updatedAt
}));
*/
  //filtering params contained in client's post request (can use pick too)
  let params = {
    vehicleIdentificationNumber: req.body.vehicleIdentificationNumber,
    vehicleModelId: req.body.vehicleModelId,
    pictureUri: req.body.pictureUri,
  };

  userVehiclesService
    .add(params)
    .then((profile) => res.status(201).json(profile)) //todo actions to be refactored since reused
    .catch((err) => res.status(400).json(err));
};

//get all the associations (with filter on userId (query param))
const getAll = (req, res) => {

  userVehiclesService
    .list(req.query.userId)
    .then((response) => {
      //should use a dto here (response containing sensitive info!)
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res
        .status(error.response ? error.response.status : 500)
        .json(error.response ? error.response.data : "Unexpected error");
    });
};

//get a specific association (with filter on vin (req param))
const get = (req, res) => {
  const vehicleIdentificationNumber = req.params.vehicleIdentificationNumber;

  userVehiclesService
    .get(vehicleIdentificationNumber)
    .then((userVehicle) => res.status(200).json(userVehicle))
    //should use a dto here (response containing sensitive info!)
    .catch((err) => res.status(400).json(err));
};

//edit an association (with filter on vin (req param))
const edit = (req, res) => {
  //filtering params contained in client's post request (can use pick too)
  const vin = req.params.vehicleIdentificationNumber;
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
const remove = (req, res) => {
  //checking for unauthorized?
  const vin = req.params.vehicleIdentificationNumber;

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

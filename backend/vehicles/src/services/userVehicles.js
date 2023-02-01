const UserVehicle = require("../models/userVehicles");

//post an association
const add = async (userVehicle) => {
  console.log(`Adding user vehicle: ${JSON.stringify(userVehicle)}`);
  return UserVehicle.findById(userVehicle._id)
    .then((result) => {
      //could be in middleware too this validation (together with checknull)
      if (result) {
        console.log(
          `Error! The user vehicle ${userVehicle._id} already exists`
        );
        throw new TypeError(
          `The user vehicle ${userVehicle._id} already exists`
        );
      }
    })
    .then(() => UserVehicle.create(userVehicle));
};

//edit an association (with filter on vin (req param))
const edit = async (vin, params) => {
  console.log(
    `Updating user vehicle ${vin} with data: ${JSON.stringify(params)}`
  );
  return UserVehicle.findOneAndUpdate(
    {
      _id: vin,
    },
    params,
    {
      new: true, //returning the updated value
    }
  );
};

//delete an association (with filter on vin (req param))
const remove = async (vin) => {
  return UserVehicle.deleteOne({
    _id: vin,
  });
};

//get a specific association (with filter on vin (req param))
const get = async (vin) => {
  console.log(`Getting vehicle by VIN: ${vin}`);
  return UserVehicle.findById(vin);
};

//get all the associations (possibly with filter on userId (query param))
const list = async (query) => {
  console.log(`Getting vehicles.`);
  //if not providing filter it returns all the vehicles
  return UserVehicle.find(query);
};

module.exports = {
  edit,
  remove,
  add,
  get,
  list,
};

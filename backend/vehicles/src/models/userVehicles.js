//const { createSchema } = require("./../utils/models.utils");

const mongoose = require("mongoose");

//- tours reference UserVehicle so cannot embed in users
//- diventa complicato gestire un array di veicoli con possibilmente delle statistiche associate innestato in user
const userVehicleSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  }, //the so-called vehicleIdentificationNumber
  vehicleModelId: { type: Number }, //not required:true since allowing user to insert not included data
  pictureUri: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Number,
  },
});

module.exports = mongoose.model("UserVehicles", userVehicleSchema);

/*vehicleIdentificationNumber: {
      type: String,
      required: true,
    },*/

const mongoose = require("mongoose");

const userVehicleSchema = mongoose.Schema({
  _id: {
    //the so-called vehicleIdentificationNumber
    type: String,
    required: true,
  },
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
    type: String,
  },
  retired: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserVehicles", userVehicleSchema);

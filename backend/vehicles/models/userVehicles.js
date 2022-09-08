const { createSchema } = require("./../utils/models.utils");

//not memorizing any schema here since I need user--to-->vehicle and not viceversa
//magari si vogliono fare ricerche sui singoli veicoli senza avere a che fare con l'utente??
//diventa complicato gestire un array di veicoli con possibilmente delle statistiche associate
// innestato in user

const { createSchema } = require("./../utils/models.utils");

//model name (used for ?), collection name
const profileSchema = createSchema("UserVehicle", "Vehicles", (mongoose) => ({
  vehicleIdentificationNumber: {
    type: String,
    required: true,
  },
  vehicleModelId: { type: Number }, //not required since allowing user to insert not included data
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
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },

  //some statistics
}));

module.exports = profileSchema;

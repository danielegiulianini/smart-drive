//handle measurements and creation/completion of trips
const Trip = require("../models/trips");

const addTrip = async (trip) => {
  //params sent by frontend must not contain _id for not overriding trips already in the DB.
  //here handling the case it contains it too
  console.log(`Adding trip: ${JSON.stringify(trip)}`);

  //db.nomeCollezione.find([[objSel],[objProj]])
  return Trip.findOne({
    _id: trip._id,
  })
    .then((result) => {
      if (result) {
        throw new TypeError(`The trip ${trip._id} already exists.`);
      }
    })
    .then(() => Trip.create(trip));
};

//handle measurements pushing (invoked by MQTT)
const addMeasurement = async (vin, newMeasurementParams) => {
  //must assign the measure to its trip, so:
  //1. retrieve the current-trip's id (the last trip without a end date for this VIN)
  //- if there's no trips open? discard
  //- it there is: update it

  const currentTrip = await Trip.findOne({
    $and: [
      { vehicleIdentificationNumber: vin }, //returning the trip boiund to this vehicleIdentificationNumber
      { endTimestamp: null }, //returning both: 1. documents with existing endTImestamp but set to null and 2. without it
    ],
  });

  if (currentTrip) {
    currentTrip.measurements.push(newMeasurementParams);
    await currentTrip.save();
  } else {
    console.log("no trips to post published measurements to are there.");
  }
};

//handle closing trip (invoked by HTTP)  by adding the endTimestamp
const close = async (tripId) => {
  // if it was already closed? override it? (no need for atomicity of findOneAndUpdate since is very
  // rare to access (reand and write) the same trip from different frontends)
  const tripToEnd = await Trip.findOne({
    _id: tripId,
  });
  if (!tripToEnd) {
    throw new TypeError(`The trip ${trip._id} doesn't exist.`);
  } else {
    if (tripToEnd.endTimestamp) {
      throw new TypeError(`The trip ${trip._id} has already been closed.`);
    } else {
      tripToEnd.endTimestamp = new Date();
      await user.save();
    }
  }
};

//no possibility to edit or delete trip externally ...
const remove = async (userId) => {
  return Trip.deleteOne({
    _id: userId,
  });
};

//read-only:
const list = async () => {
  return Trip.find();
};

//single trip
const get = async (userId) => {
  console.log(`Getting trip by ID: ${userId}`);
  return Trip.findById(userId);
};

module.exports = {
  list,
  addTrip,
  get,
  addMeasurement,
  remove,
  close,
};

//handle measurements and creation/completion of trips
const Trip = require("../models/trips");
const { now } = require("../utils/time.utils");

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
  //1. retrieve the current-trip's (the last trip without a end date for this VIN)
  //- if there's no trips open? discard
  //- it there is: update it

  console.log(newMeasurementParams);

  const currentTrip = await Trip.findOne({
    $and: [
      { userId: newMeasurementParams.userId },
      //{ vehicleIdentificationNumber: vin }, //returning the trip bound to this vehicleIdentificationNumber
      { endTimestamp: null }, //returning both: 1. documents with existing endTImestamp but set to null and 2. without it
    ],
  });

  if (currentTrip) {
    newMeasurementParams.timestamp = now();
    currentTrip.measurements.push(newMeasurementParams);

    //must set timestamp of measurement
    return await currentTrip.save();
  } else {
    console.log("no trips to post published measurements to are there.");
    return currentTrip;
  }
};

//handle closing trip (invoked by HTTP)  by adding the endTimestamp
const close = async (tripId) => {
  console.log("closing trip " + tripId);
  //(no need for atomicity of findOneAndUpdate since is very
  // rare to access (reand and write) the same trip from different frontends)
  const tripToEnd = await Trip.findOne({
    _id: tripId,
  });
  if (!tripToEnd) {
    throw new TypeError(`The trip ${tripId} doesn't exist.`);
  } else {
    if (tripToEnd.endTimestamp) {
      console.log("trip has already been closed");
      throw new TypeError(`The trip ${tripToEnd._id} has already been closed.`);
    } else {
      tripToEnd.endTimestamp = now();
      await tripToEnd.save();
    }
  }
  //if trips has no mesurements could delete it... after closing it
  return tripToEnd;
};

//read-only:
const list = async (query) => {
  return Trip.find(query);
};

//single trip
const get = async (tripId) => {
  // await Trip.deleteOne({ _id: tripId });
  //await Trip.remove({ endTimestamp: { $exists: false } });

  console.log(`Getting trip by ID: ${tripId}`);
  return Trip.findById(tripId);
};

module.exports = {
  list,
  addTrip,
  get,
  addMeasurement,
  close,
};

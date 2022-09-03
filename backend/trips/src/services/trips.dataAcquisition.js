//handle measurements and creation of trips
//findOneAndUpdate

const Trip = require("../models/trips");

const add = async (trip) => {
  //params sent by frontend must not contain _id for not overriding tips already in the DB.
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

  const currentTrip = await Trip.findOne(
    { $and: [{ vehicleIdentificationNumber: vin }, { endTimestamp: null }] } //returning both: 1. documents with existing endTImestamp but set to null and 2. without it
  );

  if (currentTrip) {
    const tripId = currentTrip._id;
    //opt. 1: Friend.measurements.push(friend); anche questa dovrebbe andare !

    //opt. 2:
    Friend.findOneAndUpdate(
      { _id: tripId },
      { $push: { measurements: newMeasurementParams } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);

          console.log(
            `Updating trip ${tripId} with data: ${JSON.stringify(
              newMeasurementParams
            )}`
          );
        }
      }
    );
  } else {
    console.log("no trips to post measurements to are there.");
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

//handle closing trip (invoked by HTTP)
const close = async (tripId, endTimestamp) => {
  //add the endTimestamp
  return Trip.deleteOne({
    _id: userId,
  });
};




module.exports = {
  list,
  add,
  get,
  addMeasurement,
  remove,
};

const Trip = require("../models/trips");

const { subtractSeconds } = require("../utils/time.utils");

loadMeasurementsToTrip = async (trip, measurementsToLoad) => {
  trip.measurements = trip.measurements.concat(measurementsToLoad);
  //trip.measurements.concat(measurementsToLoad);

  let a = await trip.save();
  console.log("the trip after loading:");
  console.log(a);
  return a;
};

exports.createFakeTripWithMeasurements = async (measurementsToLoad) => {
  //this could be a default argument
  console.log("il measurements to load:");
  console.log(measurementsToLoad);
  const fakeTripData = {
    sensorId: "fakeSensorId",
    vehicleIdentificationNumber: "JH4DA3450HS011682",
    //startTimestamp
    //endTimestamp
    userId: "fakeUserId",
  };
  const trip = await Trip.create(fakeTripData); //The create() function is a thin wrapper around the save() function.
  return loadMeasurementsToTrip(trip, measurementsToLoad);
};

exports.loadMeasurementsToTrip = loadMeasurementsToTrip;

exports.assignTimestampToMeasurementsFrom = (
  dataset,
  from,
  intervalInMinutes
) => {
  for (var i = 0; i < dataset.length; i += intervalInMinutes) {
    const measurementTimestamp = addMinutes(from, i);
    console.log("assigning timestamp:" + measurementTimestamp);
    dataset[i].timestamp = measurementTimestamp; //1 measurement for every minute
  }
  return dataset;
};

exports.assignTimestampToMeasurementsUpTo = (
  dataset,
  upTo,
  intervalBetweenMeasurementsInSeconds
) => {
  //for (var i = dataset.length; i > 0; i -= intervalInMinutes) {
  for (var i = 0; i < dataset.length; i++) {
    //al primo tolgo molto, all'ultimo poco...
    const measurementTimestamp = subtractSeconds(
      upTo,
      (dataset.length - i) * intervalBetweenMeasurementsInSeconds
    );
    console.log(
      "now subtracting:" +
        (dataset.length - i) * intervalBetweenMeasurementsInSeconds
    );
    console.log("assigning timestamp:" + measurementTimestamp);
    console.log("to measurement:");
    console.log(dataset[i]);

    dataset[i].timestamp = measurementTimestamp; //1 measurement for every minute
  }
  return dataset;
};

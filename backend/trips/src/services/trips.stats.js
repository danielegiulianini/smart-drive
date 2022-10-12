//generate some stats data from data acquisition (numeri singoli che riassumono tutto il trip)
const Trip = require("../models/trips");

//triggered by (new data publishing event) or by the conclusion of a trip
//all the aggregated info ENTRY POINT
const computeAndUpdateStats = async (tripId, fromTimestamp) => {
  console.log("calling computeAndUpdateStats with params:");
  console.log(tripId);
  console.log(fromTimestamp);
  return computeStats(tripId, fromTimestamp).then((stats) => {
    //materializing stats for performances reason (should increase transaction count too)
    return Trip.findOneAndUpdate(
      {
        _id: tripId,
      },
      {
        maxRpm: stats.maxRpm,
        avgRpm: stats.avgRpm,
        maxKph: stats.maxKph,
        avgKph: stats.avgKph,
        distanceTraveled: stats.distanceTraveled,
        duration: stats.duration,
      },
      {
        new: true, //returning updated user
      }
    ).then(statsDocs => statsDocs.length > 0 ? statsDocs[0] : null)
  });
};

const computeStats = async (tripId, fromTimestamp) => {
  return Promise.all([
    computeDistanceAndTimeTraveledStats(tripId),
    computeEngineStats(tripId, fromTimestamp),
  ]).then(([durationStats, engineStats]) => {
    console.log("the engine stats");
    console.log(engineStats);
    console.log("the duration stats");
    console.log(durationStats);
    return Object.assign(durationStats, engineStats);
  });
};

//take it from odometer ot from OpenStreetData by getting distance of every 2 positions values: the first!
const computeDistanceAndTimeTraveledStats = async (tripId) => {
  return (
    Trip.findOne({}, tripId)
      //sorting here?
      .then((trip) => {
        if (trip.measurements.length > 0) {
          const odometerAvailable =
            trip.measurements[trip.measurements.length - 1].odometer &&
            trip.measurements[0].odometer;

          return {
            duration: (trip.endTimestamp - trip.startTimestamp) / 1000, // divide by 1000 as Date records timestamp in milliseconds
            distance: odometerAvailable
              ? trip.measurements[trip.measurements.length - 1].odometer -
                trip.measurements[0].odometer
              : null, //returning undefined if odometer not available
          };
        } else
          return {
            duration: 0,
            distance: 0,
          };
      })
  );
};

const computeEngineStats = async (tripId, fromTimestamp) => {
  console.log("calling computeEngineStats with tripId: " + tripId);
  console.log("calling computeEngineStats with fromTimestamp: " + fromTimestamp);

  let queryStages = [
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$measurements" }, //$unwind the services array before grouping, else group will give you array of arrays
    //or a filter + javascript manipulation (more flexible) instead of this last group
    {
      $group: {
        //2nd grouping for getting total (trip), specific metric
        _id: {
          _id: "_id",
        },
        //summary fields of raw data
        maxRpm: { $max: "$measurements.rpm" }, //dot notation needed if working with subdocuments
        avgRpm: { $avg: "$measurements.rpm" },
        maxKph: { $max: "$measurements.kph" },
        avgKph: { $avg: "$measurements.kph" },
      },
    },
  ];

  //adding match stage (as third) in query to filter values by timestamp if provided
  if (fromTimestamp) {
    //splice(start, deleteCount)
    console.log("splicing...");
    queryStages.splice(2, 0, {
      $match: { "measurements.timestamp": { $gte: fromTimestamp } },
    });
  }

  console.log("the resulting query stage:");
  console.log(queryStages);

  //all in one query mongoose
  let statsDocs = await Trip.aggregate(queryStages);
  console.log("le stats ritornano:");
  console.log(statsDocs);
  return statsDocs.length > 0 ? statsDocs[0] : null;
};

module.exports = {
  computeEngineStats,
  computeAndUpdateStats,
};

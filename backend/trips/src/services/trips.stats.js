//generate some stats data from data acquisition (numeri singoli che riassumono tutto il trip)
const Trip = require("../models/trips");

//triggered by (new data publishing event) or by the conclusion of a trip
//all the aggregated info ENTRY POINT
const computeAndUpdateStats = async (tripId, fromTimestamp) => {
  return computeStats(tripId, fromTimestamp).then((stats) => {
    //materializing stats for performances reason (should increase transaction count too)
    return Trip.findOneAndUpdate(
      {
        _id: userId,
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
    );
  });
};

const computeStats = async (tripId, fromTimestamp) => {
  return Promise.all([
    computeDistanceAndTimeTraveledStats(tripId),
    computeEngineStats(tripId, fromTimestamp),
  ]).then(([durationStats, engineStats]) => {
    return Object.assign(durationStats, engineStats);
  });
};

//take it from odometer ot from OpenStreetData by getting distance of every 2 positions values: the first!
const computeDistanceAndTimeTraveledStats = async (tripId) => {
  return Trip.findOne({}, tripId)
    //sorting here?
    .then((trip) => {
      if (trip.measurements.length > 0) {
        return {
          duration: trip.endTimestamp - trip.startTimestamp,
          distance:
            trip.measurements[-1].odometer - trip.measurements[0].odometer,
        };
      } else
        return {
          duration: 0,
          distance: 0,
        };
    });
};

const computeEngineStats = async (tripId, fromTimestamp) => {
  //all in one query mongoose
  let stats = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$measurements" }, //$unwind the services array before grouping, else group will give you array of arrays
    //or a filter + javascript manipulation (more flexible) instead of this last group
    { $match: fromTimestamp ? { timestamp: { $gte: fromTimestamp } } : true }, //filter only data inside sliding window (if provided, otherwise don't filter)
    {
      $group: {
        //2nd grouping for getting total (trip), specific metric
        _id: {
          _id: "_id",
        },
        //summary fields of raw data
        maxRpm: { $sum: "$maxRpm" },
        avgRpm: { $sum: "$avgRpm" },
        maxKph: { $sum: "$maxKph" },
        avgKph: { $sum: "$avgKph" },
      },
    },
  ]);

  return stats;
};

module.exports = {
  computeOtherStats: computeEngineStats,
  computeAndUpdateStats,
};

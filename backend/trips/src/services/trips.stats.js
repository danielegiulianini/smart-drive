//generate some stats data from data acquisition (numeri singoli che riassumono tutto il trip)
const Trip = require("../models/trips");

//triggered by (new data publishing event) or by the conclusion of a trip
//all the aggregated info ENTRY POINT
const computeAndUpdateStats = async (tripId, fromTimestamp) => {
  return computeStats(tripId, fromTimestamp).then((stats) => {
    //materializing stats for performances reason (should increase transaction count too)
    return Profile.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        maxRpm: stats.maxRpm,
        avgRpm: stats.avgRpm,
        maxKph: stats.maxKph,
        avgKph: stats.avgKph,
      },
      {
        new: true, //returning updated user
      }
    );
  });
};

//take it from odometer ot from OpenStreetData by getting distance of every 2 positions values: the first!
const computeDistanceAndTimeTraveled = async (tripId) => {
  Trip.findOne({}, tripId)
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

const computeStats = async (tripId, fromTimestamp) => {
  return Object.assign(
    computeDistanceAndTimeTraveled(tripId),
    computeOtherStats(tripId, fromTimestamp)
  );
};

const computeOtherStats = async (tripId, fromTimestamp) => {
  //all in one query mongoose
  let stats = Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $match: fromTimestamp ? { timestamp: { $gte: dateStart } } : true }, //filter only data inside sliding window (if provided, otherwise don't filter)
    { $unwind: "$measurements" }, //$unwind the services array before grouping, else group will give you array of arrays
    //or a filter + javascript manipulation (more flexible) instead of this last group
    {
      $group: {
        //2nd grouping for getting total (trip), specific metric
        _id: {
          _id,
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
  computeAndUpdateStats,
};

//generate some stats data from data acquisition (numeri singoli che riassumono tutto il trip)
const Trip = require("../models/trips");

//triggered by (new data publishing event) or by the conclusion of a trip
//all the aggregated info ENTRY POINT
const computeAndUpdateStats = async (tripId, fromTimestamp) => {
 // console.log("calling computeAndUpdateStats with params:");
  //console.log(tripId);
  //console.log(fromTimestamp);
  const stats = await computeStats(tripId, fromTimestamp);
 // console.log("putting in document values:");
  //console.log(stats);
  //materializing stats for performances reason (should increase transaction count too)
  const statsDocs = await Trip.findOneAndUpdate(
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
  );
 // console.log("nel then di computeandUopdateStats, statsdoc is :");
 // console.log(statsDocs);
  return statsDocs;
};

const computeStats = async (tripId, fromTimestamp) => {
  //computing in parallel
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

/**
 * Returns:
 * 1. trip's duration in seconds (as OBD)
 * 2. trip's distance traveled in km (as OBD standard PID)
 *
 * @param {*} tripId
 * @returns
 */
//take it from odometer ot from OpenStreetData by getting distance of every 2 positions values: the first!
const computeDistanceAndTimeTraveledStats = async (tripId) => {
  return (
    Trip.findOne({ _id: tripId })
      //sorting here?
      .then((trip) => {
        console.log("the trips is: ");
        console.log(trip);
        if (trip.measurements.length > 0) {
          const odometerAvailable =
            trip.measurements[trip.measurements.length - 1].odometer &&
            trip.measurements[0].odometer;

          console.log("odometer is available?:" + odometerAvailable);
          console.log("endtumestamp is" + trip.endTimestamp);
          console.log("starttumestamp is" + trip.startTimestamp);

          return {
            duration: (trip.endTimestamp - trip.startTimestamp) / 1000 / 60, // divide by 1000 as Date records timestamp in milliseconds and seconds are returned
            distance: odometerAvailable
              ? trip.measurements[trip.measurements.length - 1].odometer -
                trip.measurements[0].odometer //in km as OBD
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
  // console.log("calling computeEngineStats with tripId: " + tripId);
  //console.log("calling computeEngineStats with fromTimestamp: ");
  // console.log(fromTimestamp);

  //only for debugging
  /*const fiteredMeasur = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$measurements" },
    { $match: { "measurements.timestamp": { $gte: fromTimestamp } } },
  ]);
  console.log("DDDDD I MEASUREMENTS FILTERED (with aggregate): ");
  console.log(fiteredMeasur);*/

  /*const meas2 = await Trip.find(
    {
      "measurements.timestamp": { $gte: fromTimestamp },
    },
    { lean: true }
  );*/

  /*console.log("EEEEE I MEASUREMENTS FILTERED(with find) : ");
  console.log(meas2);*/

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
    //console.log("il fromtimestamp2:");
    //console.log(fromTimestamp);
    queryStages.splice(2, 0, {
      $match: { "measurements.timestamp": { $gte: fromTimestamp } },
    });
  }

  //console.log("the resulting query stage:");
  //console.log(queryStages);

  //all in one query mongoose
  let statsDocs = await Trip.aggregate(queryStages);
  // console.log("le stats ritornano:");
  //console.log(statsDocs);
  return statsDocs.length > 0 ? statsDocs[0] : null;
};

module.exports = {
  computeEngineStats,
  computeDistanceAndTimeTraveledStats,
  computeAndUpdateStats,
};

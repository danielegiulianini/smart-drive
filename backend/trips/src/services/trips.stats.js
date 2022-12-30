//generate some stats data from data acquisition (numeri singoli che riassumono tutto il trip)
const Trip = require("../models/trips");

//triggered by (new data publishing event) or by the conclusion of a trip
//all the aggregated info ENTRY POINT
const computeAndUpdateStats = async (tripId, fromTimestamp) => {
  const stats = await computeStats(tripId, fromTimestamp);
  //materializing stats for performances reason (should increase transaction count too)
  const statsDocs = await Trip.findOneAndUpdate(
    {
      _id: tripId,
    },
    stats /*{ TO BE CHECKED
      maxRpm: stats.maxRpm,
      avgRpm: stats.avgRpm,
      maxKph: stats.maxKph,
      avgKph: stats.avgKph,
      distanceTraveled: stats.distanceTraveled,
      duration: stats.duration,
    },*/,
    {
      new: true, //returning updated user
    }
  );
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
  const queryStages = [
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
    console.log("splicing...");
    queryStages.splice(2, 0, {
      $match: { "measurements.timestamp": { $gte: fromTimestamp } },
    });
  }

  //console.log("the resulting query stage:");
  //console.log(queryStages);

  //all in one query mongoose

  statsDocs = await Promise.all([
    Trip.aggregate(queryStages),
    computeSpeedComposition(tripId, fromTimestamp),
    computeRpmComposition(tripId, fromTimestamp),
  ]).then(([basicEngineStats, speedCompositionStats, rpmCompositionStats]) => {
    console.log("the engine stats");
    console.log(basicEngineStats);
    console.log("the duration stats");
    console.log(speedCompositionStats);
    console.log("the duration stats");
    console.log(rpmCompositionStats);
    return Object.assign(
      basicEngineStats,
      speedCompositionStats,
      rpmCompositionStats
    );
  });

  let statsDocs = Trip.aggregate(queryStages);

  // console.log("le stats ritornano:");
  //console.log(statsDocs);
  return statsDocs.length > 0 ? statsDocs[0] : null;
};

const computeMeasurementAttributeComposition = async (
  tripId,
  fromTimestamp,
  attributeName,
  arrayOfRanges,
  defaultValue
) => {
  const queryStages = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$measurements" },
    {
      $bucket: {
        groupBy: "$measurements." + attributeName,
        boundaries: arrayOfRanges,
        default: defaultValue, //Number.NEGATIVE_INFINITY
        output: {
          count: { $sum: 1 },
        },
      },
    },
  ]);
  if (fromTimestamp) {
    queryStages.splice(2, 0, {
      $match: { "measurements.timestamp": { $gte: fromTimestamp } },
    });
  }

  return statsDocs.length > 0 ? statsDocs[0] : null;
};

const computeSpeedComposition = async (tripId, fromTimestamp) => {
  return computeMeasurementAttributeComposition(
    tripId,
    fromTimestamp,
    "speed",
    [0, 30, 50, 60, 130, 300],
    0
  );
};

const computeRpmComposition = async (tripId, fromTimestamp) => {
  return computeMeasurementAttributeComposition(
    tripId,
    fromTimestamp,
    "rpm",
    [0, 300, 600, 1200, 3000, 4000],
    0
  );
};

const computeSpeedLimitDeviationComposition = async (tripId, fromTimestamp) => {
  //fetch trip data
  //.maptospeedlimit for the position
  //subtract
  //group by
  
  return computeMeasurementAttributeComposition(
    tripId,
    fromTimestamp,
    "rpm",
    [0, 300, 600, 1200, 3000, 4000],
    0
  );
};

//pairSpeedWithSpeedLimit()

module.exports = {
  computeEngineStats,
  computeDistanceAndTimeTraveledStats,
  computeAndUpdateStats,
};

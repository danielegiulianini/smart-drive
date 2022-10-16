//handles score assignment
const Trip = require("../models/trips");
const { now, subtractSeconds } = require("../utils/time.utils");

//todo: remove all the preceding $ from property names!

//computes all the things (ENTRY POINT for close trip event)
const computeAndAssignScores = async (tripId) => {
  const scores = computeScores(tripId);

  //this inspects feedback consideration scores too (set by driving assistant) instead of re-examining offline all the data    ; assignStats(stats);
  const trip = await Trip.findOne({
    _id: tripId,
  });
  trip.rpmScore = scores.rpmScore;
  this.feedbackConsiderationScore = scores.feedbackConsiderationScore;
  //trip.speedScore = scores.speedScore;

  trip.totalScore =
    0.7 * scores.rpmScore + 0.3 * scores.feedbackConsiderationScore; //* scores.speedScore;

  //saving one time only here
  return await trip.save();
};

//computeScores possibly reused by driving assistant
const computeScores = async (tripId) => {
  return Object.assign(
    computeRpmScore(tripId), //, slidingWindowSizeForRpmInSeconds),
    computeFeedbackConsiderationScoreOffline(tripId)
    //computeSpeedScore(tripId, slidingWindowSizeForSpeedLimitInSeconds)
  );
};

const computeSpeedScore = async (tripId) => {
  //fecthing limits
  //stdev wrt limits
  //variance depends on windowSize
};

//joining here scores computation that can be computed with a single query performance reason)
const computeRpmScore = async (tripId) => {
  //, windowsSizeInSeconds) => {
  //const dateStart = subtractSeconds(now(), windowsSizeInSeconds); //new Date(Date.now() - slidingWindowSizeinSeconds);
  const windowsSizeInSeconds = 30;
  const tripMetrics = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$measurements" }, //$unwind the services array before grouping, else group will give you array of arrays
    //{ $match: { timestamp: { $gte: dateStart } } }, //filter only data inside sliding window
    {
      $group: {
        //1st grouping (in temporal window) for getting individual (window) metric
        _id: {
          year: { $year: "$measurements.timestamp" }, //group by expression
          dayOfYear: { $dayOfYear: "$measurements.timestamp" }, //group by expression
          hour: { $hour: "$measurements.timestamp" }, //group by expression
          interval: {
            $subtract: [
              { $second: "$measurements.timestamp" },
              {
                $mod: [
                  { $second: "$measurements.timestamp" },
                  windowsSizeInSeconds,
                ],
              },
            ],
          },
        },
        //summary fields
        // count: { $sum: 1 },
        computedRpmScore: { $stdDevPop: "$measurements.rpm" },
      },
    },
    {
      $group: {
        //2nd grouping for getting total (trip wrt window), specific metric
        _id: {
          _id: "_id",
        },
        //summary fields
        rpmScore: { $sum: "$computedRpmScore" },
      },
    },
  ]);
  console.log("la trips Metric: ");
  console.log(tripMetrics[0]);
  /*Petrol engines usually redline at 7000-8000 RPM while diesel hits the peak at around 4500 RPM. 
  This is because diesel engines are not made for high RPM in the first place.*/
  const MAX_RPM_DEVIATION = 6000;
  return {
    rpmScore:
      tripMetrics.length > 0
        ? 100 - (tripMetrics[0].rpmScore / MAX_RPM_DEVIATION) * 100 //Math.round ?
        : 0,
  };
};

//offline: invoked at the closing of a trip, it computes score considering the number of
//repeated feedbacks as a measure for user consdieration of the feedbacks provided by the app.
//if 0 duplicated feedbacks => f.c.score=1
const computeFeedbackConsiderationScoreOffline = async (tripId) => {
  const windowDurationInSeconds = 60;

  let feedbackConsMetric = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$feedbacks" }, //$unwind the services array before grouping, else group will give you array of arrays
    {
      $group: {
        //1st grouping (in temporal window) for getting individual (window) metric
        _id: {
          year: { $year: "$measurements.timestamp" }, //group by expression
          dayOfYear: { $dayOfYear: "$measurements.timestamp" }, //group by expression
          hour: { $hour: "$measurements.timestamp" }, //group by expression
          interval: {
            $subtract: [
              { $second: "$measurements.timestamp" },
              {
                $mod: [
                  { $second: "$measurements.timestamp" },
                  windowDurationInSeconds,
                ],
              },
            ],
          },
          feedbackId: "$feedbacks.id", //c'è bisogno dellanotazionea punto?
        },
        duplicatesForWindow: { $sum: 1 },
      },
    },
    {
      //or a filter + javascript manipulation (more flexible) instead of this last group
      //2nd grouping for getting total (trip wrt window), specific metric
      $group: {
        _id: {
          _id: "_id",
        },
        windowsCount: { $sum: 1 },
        totalDuplicates: { $sum: "$duplicatesForWindow" },
        //metric: { $divide: [1, { $add: [$duplicatesForWindow, 1] }] }, //+1 for avoiding /0 division
      },
    },
  ]);

  const feedbackConsiderationScoreFormula = (windowsCount, totalDuplicates) => {
    return (windowsCount / (totalDuplicates + 1)) * 100; //+1 for avoiding /0 division
  };

  return {
    feedbackConsiderationScore:
      feedbackConsMetric.length > 0
        ? feedbackConsiderationScoreFormula(
            feedbackConsMetric[0].windowsCount,
            feedbackConsMetric[0].totalDuplicates
          )
        : 0, //or undefined?
  };
};

module.exports = {
  computeAndAssignScores,
  computeScores,
};

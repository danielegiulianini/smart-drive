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
  trip.speedScore = scores.speedScore; /* */
  trip.rpmScore = scores.rpmScore; /* */
  trip.totalScore = 0.5 * scores.speedScore + 0.5 * scores.speedScore;

  //bus.publish(userId, scores); //TODO  assign scores to user micro  //or by rest

  //saving one time only here
  return await trip.save();
};

//computeScores possibly reused by driving assistant
const computeScores = async (tripId) => {
  return Object.assign(
    computeRpmScore(tripId, slidingWindowSizeForRpmInSeconds),
    computeSpeedScore(tripId, slidingWindowSizeForSpeedLimitInSeconds)
  );
};

const computeSpeedScore = async (tripId, slidingWindowSize, windowsSize) => {
  //fecthing limits
  //stdev wrt limits
  //variance depends on windowSize
};

//joining here scores computation that can be computed with a single query performance reason)
const computeRpmScore = async (tripId, windowsSizeInSeconds) => {
  const dateStart = subtractSeconds(now(), windowsSizeInSeconds); //new Date(Date.now() - slidingWindowSizeinSeconds);
  const tripMetrics = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$measurements" }, //$unwind the services array before grouping, else group will give you array of arrays
    { $match: { timestamp: { $gte: dateStart } } }, //filter only data inside sliding window
    {
      $group: {
        //1st grouping (in temporal window) for getting individual (window) metric
        _id: {
          year: { $year: "$timestamp" }, //group by expression
          dayOfYear: { $dayOfYear: "$timestamp" }, //group by expression
          hour: { $hour: "$timestamp" }, //group by expression
          interval: {
            $subtract: [
              { $second: "$timestamp" },
              { $mod: [{ $second: "$timestamp" }, windowsSizeInSeconds] },
            ],
          },
        },
        //summary fields
        count: { $sum: 1 },
        computedRpmScore: { $stdDevPop: "$rpm" },
      },
    },
    {
      $group: {
        //2nd grouping for getting total (trip wrt window), specific metric
        _id: {
          _id,
        },
        //summary fields
        rpmScore: { $sum: "$computedRpmScore" },
      },
    },
  ]);

  //if undefined (index out of bound) throw exception
  return { rpmScore: tripMetrics.length > 0 ? tripMetrics.rpmScore[0] : 0 };
};

//offline: invoked at the closing of a trip, it computes score considering the number of
//repeated feedbacks as a measure for user consdieration of the feedbacks provided by the app.
//if 0 duplicated feedbacks => f.c.score=1
const computeFeedbackConsiderationScoreOffline = async (tripId) => {
  const windowDurationInSeconds = 15;

  let feedbackConsMetric = await Trip.aggregate([
    { $match: { _id: tripId } }, //filter only data of requested trip
    { $unwind: "$feedbacks" }, //$unwind the services array before grouping, else group will give you array of arrays
    {
      $group: {
        //1st grouping (in temporal window) for getting individual (window) metric
        _id: {
          year: { $year: "$timestamp" }, //group by expression
          dayOfYear: { $dayOfYear: "$timestamp" }, //group by expression
          hour: { $hour: "$timestamp" }, //group by expression
          interval: {
            $subtract: [
              { $second: "$timestamp" },
              { $mod: [{ $second: "$timestamp" }, windowDurationInSeconds] },
            ],
          },
          feedbackId: "$feedbacks.id", //c'è bisogno dellanotazionea punto?
        },
        count: { sum: 1 },
      },
    },
    {
      $group: {
        //group by window to get metric-wise metrics
        _id: {
          year: { $year: "$timestamp" }, //group by expression
          dayOfYear: { $dayOfYear: "$timestamp" }, //group by expression
          hour: { $hour: "$timestamp" }, //group by expression
          interval: {
            $subtract: [
              { $second: "$timestamp" },
              { $mod: [{ $second: "$timestamp" }, windowDurationInSeconds] },
            ],
          },
          max: {
            $max: count, //what is this for?
          },
        },
      },
    },
    {
      $group: {
        //group by feedback to get max # of duplicated feedbacks for window
        _id: {
          id: "$feedbackId",
          max: {
            $max: count,
          },
        },
      },
    },
    {
      //or a filter + javascript manipulation (more flexible) instead of this last group
      $group: {
        //2nd grouping for getting total (trip wrt window), specific metric
        _id: {
          id: _id, //trip id
          metric: {
            $avg: { $divide: [1, { $add: [$max, 1] }] },
          },
        },
      },
    },
  ]);

  return {
    feedbackConsiderationScore:
      feedbackConsMetric.length > 0 ? feedbackConsMetric.metric[0] : 0,
  };
};

module.exports = {
  computeAndAssignScores,
};

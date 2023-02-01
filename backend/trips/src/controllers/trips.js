const publisher = require("../utils/publishSubscribe");

const tripsService = require("../services/trips.dataAcquisition");
const scoresService = require("../services/trips.scores");
const achievementsService = require("../services/trips.achievements");
const statsService = require("../services/trips.stats");

const achievementEventsTopicPrefix = "achievementsEvents/";
const scoreUpdatedEventsTopicPrefix = "scoreUpdatedEvents/";

//for promise-based routes handlers, automatic error handling is provided by express by default
//by chaining a .catch(next) call; this will not be needed since express 5.0.
//See https://expressjs.com/en/guide/error-handling.html.
const create = async (req, res) => {
  try {
    const trip = await tripsService.addTrip(req.body);

    //validation => must contain: sensorId, vehicleIdentificationNumber, userId;
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json(err);
  }
};

const close = async (req, res) => {
  console.log(`calling ${req.method} ${req.originalUrl}`);

  const tripId = req.params.tripId;
  try {
    let trip = await tripsService.close(tripId);
    //triggering computations here possibly resulting in notifications (could also expose this funtionalities in an API to pull separately (instead of a push approach!):
    //1.compute and assign scores
    //2.compute and assing statistics
    //3.check and assing achievements
    const tripScore = await scoresService.computeAndAssignScores(tripId);
    if (tripScore.totalScore > 0) {
      publisher.publish(scoreUpdatedEventsTopicPrefix + trip.userId, {
        totalScore: tripScore.totalScore,
        speedScore: tripScore.speedScore,
        rpmScore: tripScore.rpmScore,
        feedbackConsiderationScore: tripScore.feedbackConsiderationScore,
      }); //assign scores to users micro
    }
    const achievementsEvents = await achievementsService.getAchievements(
      trip.userId
    );
    if (achievementsEvents.length > 0) {
      publisher.publish(achievementEventsTopicPrefix + trip.userId, {
        badgesIds: achievementsEvents,
      }); //assign badges to users micro
    } else {
      console.log("no achievements got by trip");
    }
    //returning TRIP WITH STATISTICS
    trip = await statsService.computeAndUpdateStats(tripId);
    res.status(201).json(trip);
  } catch (err) {
    console.log("error happened");
    console.log(err);
    res.status(400).json(err);
  }
};

const get = async (req, res) => {
  console.log(`calling ${req.method} ${req.originalUrl}`);

  tripsService
    .get(req.params.tripId)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
};

const getAll = async (req, res) => {
  console.log(`calling ${req.method} ${req.originalUrl}`);
  console.log("received query: ", req.query);
  tripsService
    .list(req.query)
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.status(400).json(err));
};

//no possibility to edit or delete trip externally (so not exposing remove)...

module.exports = {
  create,
  close,
  get,
  getAll,
};

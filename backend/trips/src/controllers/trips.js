const publisher = require("../utils/publishSubscribe");

const tripsService = require("../services/trips.dataAcquisition");
const scoresService = require("../services/trips.scores");
const achievementsService = require("../services/trips.achievements");
const statsService = require("../services/trips.stats");

//to be read from (global) config (constants) file
const achievementEventsTopicPrefix = "achievementsEvents/";
const scoreUpdatedEventsTopicPrefix = "scoreUpdatedEvents/";

//for promise-based routes handlers, automatic error handling is provided by express by default
//by chaining a .catch(next) call; this will not be needed since express 5.0.
//See https://expressjs.com/en/guide/error-handling.html.
const create = async (req, res) => {
  try {
    const trip = await tripsService.addTrip(req.body);

    //validation => must contain: sensorId, vehicleIdentificationNumber, userId;
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }
};

//TODO DECIDE: frontend sending all the trips data or only the pair (patch)
//For sure, only the pair, so, for REST-compliancy, I should use patch, but it
//complicates cors handling, so I use a post
const close = async (req, res) => {
  console.log(`calling ${req.method} ${req.originalUrl}`);

  const tripId = req.params.tripId;
  try {
    const trip = await tripsService.close(tripId);
    //triggering computations here possibly resulting in notifications (could also expose this funtionalities in an API to pull separately (instead of a push approach!):
    //1.compute and assign scores
    //2.compute and assing statistics (check for PBs?)
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
    await statsService.computeAndUpdateStats(tripId);
    res.status(201).json(trip); //todo actions to be refactored since reused
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
  /*try {
    const trip = await tripsService.add(req.body);
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }*/
};

const getAll = async (req, res) => {
  console.log(`calling ${req.method} ${req.originalUrl}`);

  tripsService
    .list(req.query)
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.status(400).json(err));
  /*try {
    const trip = await tripsService.add(req.body);
    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }*/
};

//no possibility to edit or delete trip externally (so not exposing remove)...

module.exports = {
  create,
  close,
  get,
  getAll,
};

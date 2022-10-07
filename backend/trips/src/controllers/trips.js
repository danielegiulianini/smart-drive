const publisher = require("../utils/publishSubscribe");

const tripsService = require("../services/trips.dataAcquisition");
const scoresService = require("../services/trips.scores");
const achievementsService = require("../services/trips.achievements");
const statsService = require("../services/trips.stats");

//to be read from (global) config (constants) file
const achievementEventsTopicPrefix = "achievementsEvents/";
const scoreUpdatedEventsTopicPrefix = "scoreUpdatedEvents/";

const create = async (req, res) => {
  try {
    const trip = await tripsService.add(req.body);

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
  const tripId = req.tripId;
  try {
    const trip = await tripsService.close(tripId);
    //triggering computations here possibly resulting in notifications (could also expose this funtionalities in an API to pull separately (instead of a push approach!):
    //1.compute and assign scores
    //2.compute and assing statistics
    //3.check and assing achievements
    const tripTotalScore = await scoresService.computeAndAssignScores(tripId)
      .totalScore;
    publisher.publish(userId, scoreUpdatedEventsTopicPrefix + trip.userId, {
      totalScoreDelta: tripTotalScore,
    }); //assign scores to users micro
    const achievementsEvents = await achievementsService.assignAchievements(
      trip.userId
    );
    publisher.publish(userId, achievementEventsTopicPrefix + trip.userId, {
      badgeIds: achievementsEvents,
    }); //assign badges to users micro
    await statsService.computeAndUpdateStats(tripId);

    res.status(201).json(trip); //todo actions to be refactored since reused
  } catch (err) {
    res.status(400).json(err);
  }
};

const get = async (req, res) => {
  tripsService
    .get(req.tripId)
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
  tripsService
    .list()
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

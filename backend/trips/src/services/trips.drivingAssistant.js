const trips = require("../models/trips");
const Trip = require("../models/trips");
const TripStatsService = require("../services/trips.stats");
const { sortByProperty } = require("../utils/arrays.utils");

const moment = require("moment");

//this writes to db
const getAndAssignFeedback = async (tripId, measurementPayload) => {
  const newFeedbacks = await getFeedbacks(tripId, measurementPayload);
  console.log("new feedbacks are:");
  console.log(newFeedbacks);

  if (newFeedbacks.length > 0) {
    let trip = await Trip.findById(tripId);
    trip.feedbacks.push(sortByProperty(newFeedbacks, "priority")); //ritorno quello con più prorità più alta
    await trip.save();
  }
  return newFeedbacks ? newFeedbacks[0] : null;
};

const millis_in_seconds = 1000;

//feedbacks are given analyzing either scores or exact measurements
const getFeedbacks = async (tripId, measurementPayload) => {
  let feedbacks = [];

  const trip = await Trip.findById(tripId);
  console.log("TTTTTTmeasurement of the trip are: ");
  console.log(trip.measurements);
  /* measurement:
     timestamp: { type: Date },
      rpm: { type: Number },
      engineLoad: { type: Number },
      speed: { type: Number },
      odometerValue: { type: Number },

      //>these for future extensions
      acceleration: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number },
      },
      position: {
        longitude: { type: Number },
        latitude: { type: Number },
      },
      fuelRate: {
        type: Number,
      },
      */

  //se velocità è sopra ad un limite e ho già dato tempo di adattarsi al feedback... allora
  //oppure se la media delle velocità è > X e l'ultimo consiglio risale da X secs fa ...
  //1. =========================== rpm ========================================
  const rpmWindowInSeconds = 300;
  const now = moment();
  console.log("without subtactung: " + moment().utcOffset(0, true).format());
  console.log(
    "WITH subtactung: " +
      moment()
        .subtract(rpmWindowInSeconds, "seconds")
        .utcOffset(0, true)
        .format()
  );

  const engStats = await TripStatsService.computeEngineStats(
    tripId,
    moment().subtract(rpmWindowInSeconds, "seconds").utcOffset(0, true).format() //.toDate().toISOString();      //new Date() - rpmWindowInSeconds
  );
  if (engStats.avgRpm > 3000) {
    console.log("ZZZZZZZ rpm exceeding");
    feedbacks.push({ text: "Be smoother with the throttle.", priority: 2 });
  }
  /*
  or based on single measurement: 
  if (measurementPayload.rpm > 10) {
    feedbacks.push({ text: "", priority: 2 });
  } else if (measurementPayload.rpm > 5) {
    //speed
  }*/

  //3. =========================== reduce unnecessary emissions (idling) ===============
  //(spegni il motore se è da più di 10 secondi che sei fermo (v=0))
  const idleWindowInSeconds = 10;
  if (
    TripStatsService.computeEngineStats(
      tripId,
      new Date() - idleWindowInSeconds * millis_in_seconds
    ).avgKph == 0
  ) {
    feedbacks.push({
      text: "Turn the engine off to avoid unnecessary emissions.",
      priority: 1,
    });
  }

  //2. =========================== speed limits ===========================
  //compare with speedlimits

  //5. =========================== not exceeding driving time without rest =============

  //(if amount of rest (computed estimating holes in data as microncontroller is not sending
  //(assuming known and stable sampling frequency from microncontroller)) in the last hour is
  //less than a threshold => feedback)
  const notRestingWindowInSeconds = 60 * 60;
  const restBreakDurationInSecondsNeeded = 60; //rest needed:  1 minute

  const samplingPeriodInSeconds = 5; //here assuming to control microncontroller sampling period
  const nonRestDuration =
    trip.measurements.filter(
      (measurement) =>
        measurement.timestamp >
        new Date() - notRestingWindowInSeconds * millis_in_seconds
    ).length * samplingPeriodInSeconds;

  const restBreakDurationInSecondsActuallyPerformed =
    notRestingWindowInSeconds - nonRestDuration;

  const hasDriverRestRecently =
    restBreakDurationInSecondsActuallyPerformed >=
    restBreakDurationInSecondsNeeded;
  if (!hasDriverRestRecently) {
    feedbacks.push({
      text: "It's time to take a rest from driving.",
      priority: 3,
    });
  }
  //4. =========================== keep safe following distance ========================
  //PIR needed

  //6. =========================== avoid smartphone distraction =======================
  //count smartphone touches...

  return feedbacks;
};

module.exports = { getAndAssignFeedback };

const trips = require("../models/trips");
const Trip = require("../models/trips");
const TripStatsService = require("../services/trips.stats");

//this writes to db
const getAndAssignFeedback = async (tripId, measurementPayload) => {
  const feedbacks = getFeedbacks(tripId, measurementPayload);

  if (feedbacks) {
    let trip = await Trip.findById(tripId);
    trip.feedbacks.push(sortByProperty(await feedbacks, "priority")); //ritorno quello con più prorità più alta
    await trip.save();
  }
  return feedbacks ? feedbacks[0] : null;
};

const sortByProperty = (array, propertyName) => {
  array.sort((a, b) =>
    a[propertyName] > b[propertyName]
      ? 1
      : b[propertyName] > a[propertyName]
      ? -1
      : 0
  );
};

const millis_in_seconds = 1000;

//feedbacks are given analyzing either scores or exact measurements
const getFeedbacks = async (tripId, measurementPayload) => {
  let feedbacks = [];

  const trip = await Trip.findById(tripId);

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
  const rpmWindowInSeconds = 10;
  if (
    TripStatsService.computeOtherStats(tripId, new Date() - rpmWindowInSeconds)
      .avgRpm > 3000
  ) {
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
    TripStatsService.computeOtherStats(
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
  //if there is not a break (no data for periods as car turn off) or there is no period with v == 0 in last x minutes => feedback

  //4. =========================== keep safe following distance ========================
  //PIR needed

  //6. =========================== avoid smartphone distraction =======================
  //count smartphone touches...

  return feedbacks;
};

module.exports = { getAndAssignFeedback };

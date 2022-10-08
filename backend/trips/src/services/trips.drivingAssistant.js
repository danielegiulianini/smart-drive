const Trip = require("../models/trips");

//this writes to db
const getAndAssignFeedback = async (tripId, measurementPayload) => {
  const feedbacks = getFeedbacks(tripId, measurementPayload);

  if (feedbacks) {
    let trip = await Trip.findById(tripId);
    trip.feedbacks.push(feedbacks[0]); //ritorno quello con più prorità più alta
    await trip.save();
  }
  return feedbacks[0];
};

//feedbacks are given analyzing not scores but only exact measurements
//se velocità è sopra ad un limite e ho già dato tempo di adattarsi al feedback... allora
const getFeedbacks = async (tripId, measurementPayload) => {
  let feedbacks = [];

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

  //oppure se la media delle velocità è > X e l'ultimo consiglio risale a X fa ...
  //rpm
  if (measurementPayload.rpm > 10) {
    feedbacks.push({ text: "", priority: 2 });
  } else if (measurementPayload.rpm > 5) {
    //speed
  }

  //spegni il motore se è da più di 4 secondi che sei fermo (v=0)

  return feedbacks;
};

module.exports = { getAndAssignFeedback };

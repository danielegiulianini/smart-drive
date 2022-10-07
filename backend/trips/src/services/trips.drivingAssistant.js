const Trip = require("../models/trips");

//this writes to db
const getAndAssignFeedback = async (tripId) => {
  const feedback = getFeedback(tripId);
  let trip = await Trip.findById(tripId);

  trip.feedbacks.push(feedback);
  await trip.save();
  return feedback;
};

//feedbacks are given analyzing not scores but only exact measurements
//se velocità è sopra ad un limite e ho già dato tempo di adattarsi al feedback... allora
const getFeedback = async (tripId) => {
  let feedbacks = [];

  /*    timestamp: { type: Date },
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
  if (measurement.rpm > 10) {
    feedbacks.push({ text: "", priority: 2 });
  } else if (measurement.rpm > 5) {
    //speed
  }

  //spegni il motore se è da più di 4 secondi che sei fermo (v=0)

  //ritorno quello con più prorità più alta

  return feebacks[0];
};

module.exports = getAndAssignFeedback;

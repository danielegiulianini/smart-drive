//Modelling by Computed and Bucket (trips) Patterns combined
//from: https://www.mongodb.com/docs/manual/tutorial/model-iot-data/

const { createSchema } = require("../utils/models.utils");

const tripsSchema = createSchema("Trip", "Trips", (mongoose) => ({
  //-----non-aggregate:-------
  sensorId: {
    type: String,
    required: true,
  },
  vehicleIdentificationNumber: {
    type: String,
    required: true,
  },
  startTimestamp: {
    Date,
    default: Date.now, //By default, mongoose only applies defaults when you CREATE a new document
  },
  endTimestamp: {
    Date,
  },
  //for avoiding join when requesting users trips
  userId: {
    type: String,
  },
  //-----aggregate:--------
  //>basic
  distanceTraveled: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  transactionsCount: {
    type: Number,
  },
  fuelConsumption: {
    type: Number,
  },
  //>descriptive statistics
  //>ecoscore-related

  totalScore: {
    type: Number,
  },
  speedScore: {
    type: Number,
  },
  accelerationScore: {
    type: Number,
  },
  feedbackConsiderationScore: {
    type: Number,
  },
  totalScoreBreakdown: {
    speedScoreRatio: { type: Number },
    accelerationScoreRatio: { type: Number },
    feedbackConsiderationScoreRatio: { type: Number },
  },
}));

module.exports = tripsSchema;

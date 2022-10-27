//Modelling by Computed and Bucket (trips) Patterns combined
//from: https://www.mongodb.com/docs/manual/tutorial/model-iot-data/

const mongoose = require("mongoose");

//validators: unique, required

//most general data structure (including data from ECU or GPS or accelerometer)
const tripsSchema = mongoose.Schema({
  //using default _id
  //-----non-aggregate:-------
  sensorId: {
    type: String,
  },
  vehicleIdentificationNumber: {
    type: String,
    required: true,
  },
  startTimestamp: {
    type: Date,
    default: Date.now, //By default, mongoose only applies defaults when you CREATE a new document
  },
  endTimestamp: {
    type: Date,
  },
  //for avoiding distributed join when requesting users' trips
  userId: {
    type: String,
  },
  measurements: [
    //to put in other collection keeping the measurement id only here?
    {
      //>actually used:
      timestamp: { type: Date },
      rpm: { type: Number },
      kph: { type: Number },
      odometer: { type: Number },

      //>these for future extensions:
      position: {
        longitude: { type: Number },
        latitude: { type: Number },
      },
      engineLoad: { type: Number },
      acceleration: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number },
      },
      fuelRate: {
        type: Number,
      },
    },
  ],
  //-----aggregate (materialized for performance): --------
  //>basic
  distanceTraveled: {
    //km (as OBD)
    type: Number,
  },
  duration: {
    //in seconds (as OBD)
    type: Number,
  },
  transactionsCount: {
    type: Number,
  },
  fuelConsumption: {
    type: Number,
  },
  //>descriptive statistics
  avgRpm: {
    type: Number,
  },
  avgKph: {
    type: Number,
  },
  maxRpm: {
    type: Number,
  },
  maxKph: {
    type: Number,
  },
  //>>these for future extensions:
  avgEngineLoad: {
    type: Number,
  },
  avgAcceleration: {
    type: Number,
  },
  maxEngineLoad: {
    type: Number,
  },
  maxAcceleration: {
    x: { type: Number },
    y: { type: Number },
    z: { type: Number },
  },
  //>ecoscore-related
  totalScore: {
    type: Number,
  },
  speedScore: {
    type: Number,
  },
  rpmScore: {
    type: Number,
  },
  feedbackConsiderationScore: {
    type: Number,
    // default: 0, //default 0 (could be not recomputed)
  },
  totalScoreBreakdown: {
    //for a cake chart
    speedScoreRatio: { type: Number },
    rpmScoreRatio: { type: Number },
    feedbackConsiderationScoreRatio: { type: Number },
  },
  feedbacks: [
    //for computing feedback consideration score
    {
      //id: { type: String },
      text: { type: String },
      timestamp: { type: Date },
    },
  ],
});

module.exports = mongoose.model("trips", tripsSchema);

/*
//Modelling by Computed and Bucket (trips) Patterns combined
//from: https://www.mongodb.com/docs/manual/tutorial/model-iot-data/

//validators: unique, required

const { createSchema } = require("../utils/models.utils");

//most general data structure (including data from ECU or GPS or accelerometer)
const tripsSchema = createSchema("Trip", "Trips", (mongoose) => ({
  //using default _id
  //-----non-aggregate:-------
  sensorId: {
    type: String,
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
  //for avoiding join when requesting users' trips
  userId: {
    type: String,
  },
  measurements: [
    //to put in other collection keeping the measurement id only here?
    {
      //>actually used:
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
    },
  ],
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
  averageRpm: {
    type: Number,
  },
  averageEngineLoad: {
    type: Number,
  },
  averageSpeed: {
    type: Number,
  },
  averageAcceleration: {
    type: Number,
  },
  maxRpm: {
    type: Number,
  },
  maxEngineLoad: {
    type: Number,
  },
  maxSpeed: {
    type: Number,
  },
  maxAcceleration: {
    x: { type: Number },
    y: { type: Number },
    z: { type: Number },
  },
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
    default: 0, //default 0 (could be not recomputed)
  },
  totalScoreBreakdown: {
    //for a cake chart
    speedScoreRatio: { type: Number },
    rpmScoreRatio: { type: Number },
    feedbackConsiderationScoreRatio: { type: Number },
  },
  feedbacks: [
    {
      id: { typee: String },
      text: { type: String },
      timestamp: { type: Date },
      minThreshold: { type: Number },
      maxThreshold: { type: Number },
      type: { type: String, enum: ["speed", "rpm", "feedbackConsideration"] },
    },
  ],
}));

module.exports = tripsSchema;
*/

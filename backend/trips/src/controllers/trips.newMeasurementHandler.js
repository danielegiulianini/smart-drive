const dataAcquisitionService = require("../services/trips.dataAcquisition");
const drivingAssistantService = require("../services/trips.drivingAssistant");
const publisher = require("../utils/publishSubscribe");

//to be read from (global) config (constants) file
const drivingNotificationsTopicPrefix = "drivingNotifications/";
const measurementsTopicPrefix = "measurements/";

const handleNewMeasurement = async (vin, measurementPayload) => {
  //no need for destructuring for validation (mongoose's strict option cut exceeding fields off)
  /*let params = {
        _id: payload.tokenUserId,
        surname: payload.surname,
        name: payload.name,
        gender: req.body.gender,
        language: req.body.language,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
      };*/

  try {
    //only saving data in driving mode
    trip = await dataAcquisitionService.addMeasurement(vin, measurementPayload);
    console.log("the trip is:");
    console.log(trip);
    if (trip) {
      //1. give advice to user via phone!... (I assume it's connected while nodemcu is sending here!)
      const feedback = await drivingAssistantService.getAndAssignFeedback(
        trip._id,
        measurementPayload
      );
      if (feedback) {
        publisher.publish(drivingNotificationsTopicPrefix + trip.userId, {
          feedback: feedback,
        });
      }

      //2. communicating real-time data
      publisher.publish(measurementsTopicPrefix + trip.userId, {
        measurement: measurementPayload,
      });
    }
  } catch (error) {
    console.log(error); //returning error to arduino? you can't (mqtt is not request/response)
  }
};

module.exports = { handleNewMeasurement };

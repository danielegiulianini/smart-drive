const dataAcquisitionService = require("../services/trips.dataAcquisition");
const drivingAssistantService = require("../services/trips.drivingAssistant");
const publisher = require("../utils/publishSubscribe");

const drivingNotificationsTopicPrefix = "drivingNotifications/";
const measurementsTopicPrefix = "measurements/";

const handleNewMeasurement = async (vin, measurementPayload) => {
  //no need for destructuring for validation (mongoose's strict option cut exceeding fields off)

  try {
    //only saving data in driving mode
    trip = await dataAcquisitionService.addMeasurement(vin, measurementPayload);
    if (trip) {
      //these two lines, although inefficient, allows, by including userId into
      //measurement from arduino, to not make user choose a vehicle when starting
      //a new trip
      trip.vehicleIdentificationNumber = vin;
      await trip.save();
      //==========================================================================

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
    console.log(error); //you can't return error to arduino (mqtt is not request/response)
  }
};

module.exports = { handleNewMeasurement };

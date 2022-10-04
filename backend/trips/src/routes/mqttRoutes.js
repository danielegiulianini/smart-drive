//handles mqtt routing based on topics (topic-based routing)

const TripController = require("../controllers/trips.dataAcquisition");

const setupRoutes = (client) => {
  client.subscribe([vehiclesTopics], () => {
    console.log(`Subscribed to topic '${vehiclesTopics}'`);
  });

  client.on("connect", () => {
    //every time car is turn off and turn on: a connect event is triggered
    //ignoring connection event
    console.log("Connected");
  });
  client.on("message", (topic, payload) => {
    //here calling "MQTT"controller as for HTTP
    if (topic == "") {
      trip = TripController.addMeasurement(extractVinFromTopic(topic), payload);
      console.log(
        `received msg at trips server of topic '${topic}' with content '${payload.toString()}'`
      );
      if (trip) {
        //give advice to user via phone!... (I assume it's connected while nodemcu is sending here!)
        message = {
          feedback: drivingAssistantService.getAndAssignFeedback(trip._id), //receiver: trip.userId, put in topic instead
        };
        console.log(
          `sending msg from trips server for topic '${topic}' with content '${message.toString()}'`
        );
        //publish(mqtt client, topic, message)
        publish(client, drivingNotificationsTopicPrefix + trip.userId, message);
      }
    }
  });
};

const extractVinFromTopic = (topic) => {
  const myRe = new RegExp("[^/]+(?=/$|$)");
  return myRe.exec(topic)[0]; //exec returns an array (first arg is the matched pattern)
};

const publish = (client, topic, message) => {
  client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

const vehiclesTopixPrefix = "vehicles";
const vehiclesTopics = vehiclesTopixPrefix + "/+/"; // vehicles/<VIN>/ (1. no starting / 2. + is one-level wildcard)

//to be read from (global) config (constants) file
const drivingNotificationsTopicPrefix = "drivingNotifications/";

//to be read from (global (with other micros)) config (constants) file
const notificationsTopicPrefix = "notifications/";

const achievementsTopicPrefix = "AchievementsEvents/";
const vehiclesRegex = "^" + vehiclesTopicPrefix + "[^/]+$";


module.exports = {
  setupRoutes,
};

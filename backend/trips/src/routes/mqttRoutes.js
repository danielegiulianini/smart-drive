//handles mqtt routing based on topics (topic-based routing)
const TripController = require("../controllers/trips.newMeasurementHandler");
const publishSubscribe = require("../utils/publishSubscribe");

//to be read from (global) config (constants) file
const vehiclesTopixPrefix = "vehicles/";
const vehiclesEventsRegex = new RegExp("^" + vehiclesTopixPrefix + "[^/]+$"); //^vehicles\/[^/]+$
const vehiclesTopics = vehiclesTopixPrefix + "+"; // vehicles/<VIN>/ (1. no starting / 2. + is one-level wildcard)

const setupRoutes = () => {
  publishSubscribe.subscribe([vehiclesTopics], () => {
    console.log(`trips Subscribed to topic '${vehiclesTopics}'`);
  });

  publishSubscribe.onConnect(() => {
    //every time car is turn off and turn on: a connect event is triggered ignoring connection event
    console.log("trips Connected to mqtt broker");
  });
  publishSubscribe.onMessage((topic, payload) => {
    //here calling "MQTT"controller as for HTTP
    console.log(
      `received msg at trips server of topic '${topic}' with content '${payload.toString()}'`
    );

    if (vehiclesEventsRegex.test(topic)) {
      const vin = topic.substring(topic, vehiclesTopixPrefix.length);
      TripController.handleNewMeasurement(vin, payload);
    }
  });
};

module.exports = {
  setupRoutes,
};

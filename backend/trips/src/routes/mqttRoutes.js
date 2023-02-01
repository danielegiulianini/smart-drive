//handles mqtt routing based on topics (topic-based routing)
const TripController = require("../controllers/trips.newMeasurementHandler");
const publishSubscribe = require("../utils/publishSubscribe");

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
    console.log(
      `received msg at trips server of topic '${topic}' with content '${payload.toString()}'`
    );

    if (vehiclesEventsRegex.test(topic)) {
      //substring(indexStart, indexEnd)
      const vin = topic.substring(vehiclesTopixPrefix.length);

      try {
        //console.log("the vin in mqttRoutes: " + vin);
        TripController.handleNewMeasurement(vin, JSON.parse(payload));
      } catch (parseError) {
        console.log("json payload not valid");
      }
    }
  });
};

module.exports = {
  setupRoutes,
};

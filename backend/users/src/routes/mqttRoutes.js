//handles mqtt routing based on topics (topic-based routing)
//import config 




const topic = "notifications"; // vehicles/<VIN>/ (1. no starting / 2. + is one-level wildcard)
/*
const setupRoutes = (client) => {
  client.subscribe([topic], () => {
    console.log(`Subscribed to topic '${topic}'`);
  });

  client.on("connect", () => {
    //every time car is turn off and turn on: a connect event is triggered
    //ignoring connection event
    console.log("Connected");
  });
  client.on("message", (topic, payload) => {
    //here calling "MQTT"controller as for HTTP
    //TripController.addMeasurement(extractVinFromTopic(topic), payload);

    //check topic for:
    //-achievements

    //maybe publish to notification service?!
    publish("achievementUnlocked", achievement, user._id);
    //points updated
    //maybe publish to notification service?!
    publish("achievementUnlocked", achievement, user._id);

    console.log("Received Message:", topic, payload.toString());
  });
};
*/
const extractVinFromTopic = (topic) => {
  const myRe = new RegExp("[^/]+(?=/$|$)");
  return myRe.exec(topic)[0]; //exec returns an array (first arg is the matched pattern)
};




module.exports = {
  setupRoutes,
};
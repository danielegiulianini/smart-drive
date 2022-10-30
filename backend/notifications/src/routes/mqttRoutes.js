//handles mqtt routing based on topics (topic-based routing)
const NotificationsController = require("./../controllers/NotificationsController");
const publishSubscribe = require("../utils/publishSubscribe");

//to be read from (global) config (constants) file
const notificationsTopixPrefix = "notifications/";
const notificationEventsRegex = new RegExp(
  "^" + notificationsTopixPrefix + "[^/]+$"
); //^notifications\/[^/]+$
const notificationsTopics = notificationsTopixPrefix + "+";

const setupRoutes = () => {
  publishSubscribe.onConnect(() => {
    console.log("notifications backend connected to mqtt broker");

    publishSubscribe.subscribe([notificationsTopics], () => {
      console.log(`notifications backend subscribed to topic '${notificationsTopics}'`);
    });
  });

  publishSubscribe.onMessage((topic, payload) => {
    if (notificationEventsRegex.test(topic)) {
      NotificationsController.onMessageArrived(JSON.parse(payload));
      console.log("Received notification message:", topic, payload.toString());
    } else {
      console.log("no messages for notifications at notifications microservice")
    }
  });
};

module.exports = {
  setupRoutes,
};

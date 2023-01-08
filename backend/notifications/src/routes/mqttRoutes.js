//handles mqtt routing based on topics (topic-based routing)
const NotificationsController = require("./../controllers/NotificationsController");
const publishSubscribe = require("../utils/publishSubscribe");

//to be read from (global) config (constants) file
const notificationsTopixPrefix = "notifications/";
const notificationEventsRegex = new RegExp(
  "^" + notificationsTopixPrefix + "[^/]+$"
); //^notifications\/[^/]+$
const notificationsTopics = notificationsTopixPrefix + "+";

const drivingNotificationsTopixPrefix = "drivingNotifications/";
const drivingNotificationEventsRegex = new RegExp(
  "^" + drivingNotificationsTopixPrefix + "[^/]+$"
); //^drivingNotifications\/[^/]+$
const drivingNotificationsTopics = drivingNotificationsTopixPrefix + "+";

const measurementsTopixPrefix = "measurements/";
const measurementsEventsRegex = new RegExp(
  "^" + measurementsTopixPrefix + "[^/]+$"
); //^drivingNotifications\/[^/]+$
const measurementsTopics = measurementsTopixPrefix + "+";

const setupRoutes = () => {
  publishSubscribe.subscribe(
    [notificationsTopics, drivingNotificationsTopics, measurementsTopics],
    () => {
      
      console.log(
        `notifications backend subscribed to topic '${[
          notificationsTopics,
          drivingNotificationsTopics,
        ]}'`
      );
    }
  );
  publishSubscribe.onConnect(() => {
    console.log("notifications backend connected to mqtt broker");

    
  });

  publishSubscribe.onMessage((topic, payload) => {
    console.log(
      `received msg at notifications server of topic: '${topic}' with content: '${payload.toString()}'`
    );
    if (notificationEventsRegex.test(topic)) {
      const userId = topic.substring(notificationsTopixPrefix.length);

      NotificationsController.onNewNotification(userId, payload);
    } else if (drivingNotificationEventsRegex.test(topic)) {
      const userId = topic.substring(drivingNotificationsTopixPrefix.length);

      NotificationsController.onNewDrivingNotification(userId, payload);
    } else if (measurementsEventsRegex.test(topic)) {
      const userId = topic.substring(measurementsTopixPrefix.length);

      NotificationsController.onNewMeasurement(userId, payload);
    } else {
      console.log("no mqtt messages at notifications microservice");
    }
  });
};

module.exports = {
  setupRoutes,
};

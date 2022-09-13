//handles mqtt routing based on topics (topic-based routing)
const NotificationsController = require("./../controllers/NotificationsController");
const topic = "notifications"; // (no starting /)

const setupRoutes = (client) => {
  client.on("connect", () => {
    console.log("notifications backend connected to mqtt broker");

    client.subscribe([topic], () => {
      console.log(`notifications backend subscribed to topic '${topic}'`);
    });
  });

  client.on("message", (topic, payload) => {
    NotificationsController.onMessageArrived(payload);
    console.log("Received notification message:", topic, payload.toString());
  });
};

module.exports = {
  setupRoutes,
};

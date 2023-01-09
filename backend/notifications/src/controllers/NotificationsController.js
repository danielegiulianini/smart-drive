const Notification = require("../models/notifications");

let users = {};

function logout(userId) {
  onUserDisconnected(userId);
  delete users[userId];
}

function onUserDisconnected(userId) {
  console.log(`User with id ${userId} disconnected from notifications`);
}

//used when sending notification
async function onNewNotification(userId, notification) {
  //from mqtt
  var buffer = new Uint8Array(notification);
  var fileString = String.fromCharCode.apply(null, buffer);
  notification = JSON.parse(fileString);

  console.log("persisting notification...", notification);
  notification.recipient = userId;
  notification = await Notification.create(notification); //implicitly assigning the id (and other fields) returned by mongoose

  const socket = users[userId];
  if (socket) {
    socket.emit("notification", notification);
    console.log(`Sending to user ${userId} notification ${notification}`);
  } else {
    console.log(
      `User with id ${userId} is not currently logged in to notifications microservice`
    );
  }
}

function onNewDrivingNotification(userId, drivingNotification) {
  const socket = users[userId];
  if (socket) {
    socket.volatile.emit("drivingNotification", drivingNotification); //using volatile here for not saving messages whule out of connection
    console.log(
      `Sending to user ${userId} drivingNotification ${drivingNotification}`
    );
  } else {
    console.log(
      `User with id ${userId} is not currently logged in to notifications microservice`
    );
  }
}

function onNewMeasurement(userId, measurement) {
  const socket = users[userId];
  if (socket) {
    socket.volatile.emit("measurement", measurement); //using volatile here for not saving messages whule out of connection
    console.log(`Sending to user ${userId} measurement ${measurement}`);
  } else {
    console.log(
      `User with id ${userId} is not currently logged in to notifications microservice`
    );
  }
}

//used by index.html
function onConnection(socket) {
  users[socket.userId] = socket;
  socket.on("logout", () => logout(socket.userId)); //each message at logout event cause the client to be logged out
  socket.on("disconnect", function () {
    if (socket.userId) onUserDisconnected(socket.userId);
  });
}

module.exports = {
  onNewNotification,
  onNewDrivingNotification,
  onNewMeasurement,
  onConnection,
};

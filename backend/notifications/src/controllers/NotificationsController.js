let users = {};

function logout(userId) {
  onUserDisconnected(userId);
  delete users[userId];
}

function onUserDisconnected(userId) {
  console.log(`User with id ${userId} disconnected from notifications`);
}

//used when sending notification
function onNewNotification(userId, notification) {
  //from mqtt
  const socket = users[userId];
  if (socket) {
    socket.emit("notification", notification);
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
  } else {
    console.log(
      `User with id ${userId} is not currently logged in to notifications microservice`
    );
  }
}

//used by index.html
function onConnection(socket) {
  users[socket.tokenUserId] = socket;
  socket.on("logout", () => logout(socket.tokenUserId)); //each message at logout event cause the client to be logged out
  socket.on("disconnect", function () {
    onUserDisconnected(socket.tokenUserId);
  });
}

module.exports = {
  onNewNotification,
  onNewDrivingNotification,
  onNewMeasurement,
  onConnection,
};

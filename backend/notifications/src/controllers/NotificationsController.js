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
  if (userId) {
    context.socket.emit("notification", notification);
  } else {
    console.log(
      `User with id ${userId} is not currently logged in to notifications microservice`
    );
  }
}

function onNewDrivingNotification(userId, drivingNotification) {
  if (userId) {
    context.socket.volatile.emit("drivingNotification", drivingNotification); //using volatile here for not saving messages whule out of connection
  } else {
    console.log(
      `User with id ${userId} is not currently logged in to notifications microservice`
    );
  }
}

//used by index.html
const onConnection = function (socket) {
  users[socket.tokenUserId] = socket;
  socket.on("logout", () => logout(socket.tokenUserId));
  socket.on("disconnect", function () {
    onUserDisconnected(socket.tokenUserId);
  });
};

module.exports = { onNewNotification, onNewDrivingNotification, onConnection };

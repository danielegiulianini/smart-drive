function logout(context) {
  onUserDisconnected(context);
  context.userId = undefined;
}

function onUserDisconnected(context) {
  if (context.userId) {
    console.log(
      `User with id ${context.userId} disconnected from notifications`
    );
  }
}

//used when sending notification
function onNewNotification(context, notification) {
  if (context.userId) {
    context.socket.emit("notification", notification);
  } else {
    console.log(
      `User with id ${context.userId} has never been connected to notifications microservice`
    );
  }
}

function onNewDrivingNotification(context, notification) {
  if (context.userId) {
    context.socket.volatile.emit("notification", notification);
  } else {
    console.log(
      `User with id ${context.userId} has never been connected to notifications microservice`
    );
  }
}

//used by index.html
exports.onConnection = function (socket) {
  let context = {
    socket,
  };
  socket.on("logout", () => logout(context));
  socket.on("disconnect", function () {
    onUserDisconnected(context);
  });
};

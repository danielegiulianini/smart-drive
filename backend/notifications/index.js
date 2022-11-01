const express = require("express");

const { setupRoutes } = require("./src/routes/mqttRoutes");
const {
  notificationsController,
} = require("./src/controllers/NotificationsController");
const { authenticateAndSaveUserId } = require("./src/middlewares/authSocketIo");

const http = require("http");

const port = 8088; //const port = Number(process.env.NOTIFICATIONS_MICROSERVICE_INTERNAL_PORT);
const app = express();

const server = http.createServer(app);

async function startServer() {
  //only used if exposing REST endpoint too (ex. for showing all users notifications)
  //console.log("Connecting to db...");
  //await dbUtil.connect(dbConfig);
  //console.log("Connected!");

  console.log("Setting up routes...");

  //only used if exposing REST endpoint too (ex. for showing all users notifications)
  //const routes = require("./routes");
  //app.use("/api/v1", routes);
  setupRoutes();
  console.log("routes bound");

  //only used if exposing REST endpoint tpo (ex. for showing all users notifications)
  /*app.listen(port, () =>
    console.log(
      `Notification backend listening on port ${port} and subscribed for MQTT data (notification)`
    )
  );*/

  console.log("setting up socket.io endpoint...");

  const io = require("socket.io")(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  });

  //auth middleware
  io.use(authenticateAndSaveUserId);

  io.on("connection", function (socket) {
    console.log("New connection available");
    notificationsController.onConnection(socket);
  });

  console.log("socket.io endopoint setup");
}

startServer();

const express = require("express");

const { setupRoutes } = require("./src/routes/mqttRoutes");
const notificationsController = require("./src/controllers/NotificationsController");
const { authenticateAndSaveUserId } = require("./src/middlewares/authSocketIo");
const dbUtil = require("./src/utils/mongooseUtils");
const dbConfig = require("./src/config/db.config");
const http = require("http");

const port = 8088; //const port = Number(process.env.NOTIFICATIONS_MICROSERVICE_INTERNAL_PORT);
const app = express();

const server = http.createServer(app);

async function startServer() {
  //used for exposing REST endpoint (ex. for showing all users notifications)
  console.log("Connecting to db...");
  await dbUtil.connect(dbConfig);
  console.log("Connected!");

  console.log("Setting up routes...");

  //REST endpoint routes (ex. for showing all users notifications)
  const routes = require("./src/routes");
  app.use("/api/v1", routes);

  //mqtt routed
  setupRoutes();
  console.log("routes bound");

  console.log("setting up socket.io endpoint...");

  const io = require("socket.io")(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  });

  //auth middleware
  io.on("connection", (socket) => {
    //.use(authenticateAndSaveUserId)//to re-enable after testing
    console.log("New connection available");
    notificationsController.onConnection(socket);
  });

  console.log("socket.io endopoint setup");

  //only used if exposing REST endpoint tpo (ex. for showing all users notifications)

  server.listen(port, () =>
    console.log(
      `Notification backend listening on port ${port} and subscribed for MQTT data (notification)`
    )
  );
}

startServer();

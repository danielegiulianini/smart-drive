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

  const cors = require("cors");
  const corsOptions = {
    origin: true, //set origin to true to reflect the request origin (stricter than wildcard *) so browsers allow to view response
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  app.use(cors(corsOptions));

  //it avoids that req's body are undefined
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());

  //1. REST endpoint routes (ex. for showing all users notifications)
  const routes = require("./src/routes");
  app.use("/api/v1", routes);

  //2. mqtt routes
  setupRoutes();
  console.log("routes bound");

  console.log("setting up socket.io endpoint...");

  const io = require("socket.io")(server, {
    cors: {
      origin: "*", // "http://localhost:8000",
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
      allowEIO3: true,
      credentials: true,
    },
  });

  //socket.io auth middleware
  io.use(authenticateAndSaveUserId); 
  
  io.on("connection", (socket) => {
    console.log("New connection available from user with id", socket.userId);
    notificationsController.onConnection(socket);
  });

  console.log("socket.io endpoint setup");

  server.listen(port, () =>
    console.log(
      `Notification backend listening on port ${port} and subscribed for MQTT data (notification)`
    )
  );
}

//needed for letting mongo container complete init (compose' "depends_on: mongodb" 
//waits until mongodb starts and NOT until it's ready) before this service is started
const delayInMillis  = 5000;  
setTimeout(startServer, delayInMillis);
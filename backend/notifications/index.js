const { setupRoutes } = require("./src/routes/mqttRoutes");
const mqtt = require("mqtt");
const port = 8088; //const port = Number(process.env.NOTIFICATIONS_MICROSERVICE_INTERNAL_PORT);

async function startServer() {
  //only used if exposing REST endpoint (ex. for showing all users notifications)
  //console.log("Connecting to db...");
  //await dbUtil.connect(dbConfig);
  //console.log("Connected!");

  console.log("Setting up routes...");

  //only used if exposing REST endpoint (ex. for showing all users notifications)
  //const routes = require("./routes");
  //app.use("/api/v1", routes);
  setupRoutes();
  console.log("routes bound");

  //only used if exposing REST endpoint (ex. for showing all users notifications)
  /*app.listen(port, () =>
    console.log(
      `Notification backend listening on port ${port} and subscribed for MQTT data (notification)`
    )
  );*/
}

startServer();

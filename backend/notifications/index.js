const { setupRoutes } = require("./src/routes/mqttRoutes");
const mqtt = require("mqtt");
const port = 8088; //const port = Number(process.env.NOTIFICATIONS_MICROSERVICE_INTERNAL_PORT);

//all this info is to be refactored in file imported in mqttConfig
const mqttConfig = require("./src/config/mqtt.config");
const brokerPort = 1883; //Number(process.env.MQTT_BROKER_MQTT_INTERNAL_PORT);
const brokerHost = "mosquitto";
const brokerConnectUrl = `mqtt://${brokerHost}:${brokerPort}`;
const clientId = "notificationsService";
const connectConfig = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
};

async function startServer() {
  //only used if exposing REST endpoint (ex. for showing all users notifications)
  //console.log("Connecting to db...");
  //await dbUtil.connect(dbConfig);
  //console.log("Connected!");

  //read configs from config file
  const client = mqtt.connect(brokerConnectUrl, connectConfig);

  console.log("Setting up routes...");

  //only used if exposing REST endpoint (ex. for showing all users notifications)
  //const routes = require("./routes");
  //app.use("/api/v1", routes);
  setupRoutes(client);
  console.log("routes bound");

  /*app.listen(port, () =>
    console.log(
      `Notification backend listening on port ${port} and subscribed for MQTT data (notification)`
    )
  );*/
}

startServer();

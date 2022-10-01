const brokerPort = 1883; //Number(process.env.MQTT_BROKER_MQTT_INTERNAL_PORT);
const brokerHost = "mosquitto";
const brokerConnectUrl = `mqtt://${brokerHost}:${brokerPort}`; //to be read from config
const clientId = "notifications service";
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
};

module.exports = {
  brokerConnectUrl,
  options,
};

const brokerPort = 1883; //Number(process.env.MQTT_BROKER_MQTT_INTERNAL_PORT);
const brokerHost = "mosquitto";
const brokerConnectUrl = `mqtt://${brokerHost}:${brokerPort}`; //to be read from config
const clientId = "trips service";
const options = {
  clientId: clientId,
  clean: true,
  connectTimeout: 4000,
  username: "trips",
  password: "public",
  reconnectPeriod: 1000,
};

module.exports = {
  brokerConnectUrl,
  options,
};

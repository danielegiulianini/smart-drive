//this contains the logic of publishing to mqtt...

const mqtt = require("mqtt");
const mqttConfig = require("../config/mqtt.config");

//put this in a method?
const client = mqtt.connect(mqttConfig.brokerConnectUrl, mqttConfig.options);

const publish = (topic, message) => {
  client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

module.exports = publish;

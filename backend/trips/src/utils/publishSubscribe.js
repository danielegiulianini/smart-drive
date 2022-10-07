const mqtt = require("mqtt");
const mqttConfig = require("../config/mqtt.config");

var PublishSubscribe = function () {
  console.log("connecting mqtt client...");
  this.client = mqtt.connect(mqttConfig.brokerConnectUrl, mqttConfig);
};

PublishSubscribe.prototype.subscribe = function (topicsArray, callback) {
  this.client.subscribe(topicsArray, callback);
};

PublishSubscribe.prototype.onConnect = function (callback) {
  this.client.on("message", callback);
};

PublishSubscribe.prototype.onMessage = function (callback) {
  this.client.on("message", callback);
};

PublishSubscribe.prototype.publish = function (topic, message) {
  this.client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

module.exports = new PublishSubscribe();


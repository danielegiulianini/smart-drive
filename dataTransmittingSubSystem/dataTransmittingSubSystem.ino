#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>

#include "BlockingElm327.h"
#include "Logger.h"

#define __BAUD_RATE 9600

#ifndef STASSID
#define STASSID "AndroidAP2C3A" //"politenet2.0" //
#define STAPSK "cniu9651" //"hfip0676zy%$56zs24DL" // 
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

const char* mqtt_server = "192.168.43.214"; //"192.168.8.100"; //"192.168.43.214";//"192.168.8.100";//(for politenet);//"http://192.168.43.214";//for smartphone"broker.hivemq.com";//for local dev: see it with ipconfig (it changes from network to network)
const int brokerPort = 1883;

const char* userId = "a45c2a4a-0966-423a-a17b-020bd4293e48";//"f899524a-9975-45a1-83c8-aaf2ffe054ac"; //of g@g "39ff2f49-88a5-4aed-813b-1ee78b4fd63c"; //d@g;"a45c2a4a-0966-423a-a17b-020bd4293e48";//l@g 

int status = WL_IDLE_STATUS;
WiFiClient wifiClient;
PubSubClient client(wifiClient);

SoftwareSerial myNode(D1, D2); //RX, TX
char publishingTopic[30];

char buffer[256]; //buffer hosting json document with measurements

BlockingElm327 myElm;

Logger* logger;

void setup() {
  Serial.begin(__BAUD_RATE);
  myNode.begin(__BAUD_RATE);

  delay(10);

  logger = Logger::GetInstance();
  logger->setPrefix("nodemcu");

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();

  delay(100);

  //as the default max message size, including header, is 256 bytes,
  //possible need for PubSubClient::setBufferSize(size)

  connectWifi();
  initMQTT();

  //bool BlockingElm327::init(Stream & stream, const bool & debug, const uint16_t &timeout);
  myElm.init(myNode, true, 4000);

  char vin[18] = "5TEWN72N63Z275910";//of l@g;"4NUDT13S962700984";//of g@g JH4KA4650JC000403"; //of d@g
  strcpy(publishingTopic, String(String("vehicles/") + String(vin)).c_str()); //PubSubClient wants topic as a char[]
}

void loop() {
  //handling disconnections
  if (WiFi.status() != WL_CONNECTED) {
    connectWifi();
  } else {
    if (!client.connected()) {
      connectMQTT();
    } else {
      readAndPublishData();
    }
  }
  client.loop();
  delay(1000);
}

void initMQTT() {
  logger->log(F("Initializing MQTT"));

  randomSeed(micros());
  client.setServer(mqtt_server, brokerPort);
  connectMQTT();
}

void connectMQTT() {
  while (!client.connected()) {
    String clientId = userId;
    if (client.connect(clientId.c_str())) {
      logger->log(F("Successfully connected MQTT."));
    } else {
      logger->log(F("Error!"));
      logger->log("" + client.state());
    }
  }
}

//sending all data in one shot with mqtt
void readAndPublishData() {

  //publishing the data read to backend via mqtt
  StaticJsonDocument<128> doc;  //capacity determined with ArduinoJson Assistant (recommended way, from https://arduinojson.org/v6/assistant/#/step1)

  doc["userId"] = userId; //since frontend doesn't send vin must be a binding trip-user
  doc["rpm"] = myElm.rpm();
  doc["kph"] = myElm.kph();
  doc["fuelLevel"] = myElm.fuelLevel();
  doc["odometer"] = myElm.odometer();
  //possibly other info(engineLoad, throttle position...)

  //(from: https://arduinojson.org/v6/api/json/serializejson/)
  logger->log(F("Publishing to topic: ")); logger->log(publishingTopic); logger->log(F(" document:"));
  serializeJsonPretty(doc, Serial);
  size_t n = serializeJson(doc, buffer);

  //boolean publish (topic, payload, [length], [retained]) (from: https://pubsubclient.knolleary.net/api)
  client.publish(publishingTopic, buffer, n);
}

void connectWifi() {
  WiFi.begin(ssid, password);

  while (status != WL_CONNECTED) {
    status = WiFi.status();
    delay(1000);
    Serial.print(F("."));
  }
}

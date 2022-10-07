//not actually needed (since not copied .env file into container)
//require('dotenv').config({ path: require('find-config')('.env'), debug: true }); //require('dotenv').config({path:__dirname + '/./../../../.env'});

const { setupRoutes } = require("./src/routes/mqttRoutes");
// Require express and create an instance of it
var express = require("express");
var app = express();

//cors library abstracts header-writing
const cors = require("cors");
const corsOptions = {
  origin: true, //set origin to true to reflect the request origin (stricter than wildcard *) so browsers allow to view response
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//const expressValidator = require('express-validator')
//app.use(expressValidator())
//this is required for returning status codes too
//app.use(function(err, req, res, next) {
//  if (err instanceof ValidationError) {
//    return res.status(err.statusCode).json(err)
//  }
//
//  return res.status(500).json(err)
//})

const port = 8083; //const port = Number(process.env.TRIPS_MICROSERVICE_INTERNAL_PORT);

//retrieve connection string from config file (.env or inside config folder)
const dbConfig = require("./src/config/db.config");
const dbUtil = require("./src/utils/mongooseUtils");

const mqtt = require("mqtt");
const mqttConfig = require("./src/config/mqtt.config");

async function startServer() {
  console.log("Connecting to db...");
  await dbUtil.connect(dbConfig);
  console.log("Connected!");

  //mi connetto al gateway o direttamente al broker interno?
  const client = mqtt.connect(mqttConfig.brokerConnectUrl, mqttConfig.options);
  

  console.log("Setting up routes ...");
  const routes = require("./src/routes");
  //http routes
  app.use("/api/v1", routes);
  //mqtt routes
  setupRoutes(client);
  console.log("routes bound.");

  app.listen(port, () =>
    console.log(
      `trips backend listening on port ${port} for HTTP requests and subscribed for MQTT data`
    )
  );
}

startServer();

const connectionUri = require("./src/config/db.config.js");

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

const port = 8086; //const port = Number(process.env.USERS_MICROSERVICE_INTERNAL_PORT);
const imagesBaseUrl = "/api/v1"

//retrieve connection string from config file (could use .env or inside config folder)
const dbConfig = require("./src/config/db.config");
const dbUtil = require("./src/utils/mongooseUtils");

async function startServer() {
  //no need for db...
  console.log("Connecting to db...");
  await dbUtil.connect(dbConfig);
  console.log("Connected!");

  console.log("Setting up routes ...");
  const routes = require("./src/routes");

  /*micro's base path*/
  app.use(imagesBaseUrl, routes);
  app.use(imagesBaseUrl + "/images", express.static("uploads"));

  console.log("routes bound");

  app.listen(port, () =>
    console.log(`Images backend listening on port ${port}!`)
  );
}

startServer();

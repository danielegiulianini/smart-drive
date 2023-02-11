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

const port = 8087; //const port = Number(process.env.VEHICLES_MICROSERVICE_INTERNAL_PORT);

//retrieve connection string from config file (.env or inside config folder)
const dbConfig = require("./src/config/db.config");
const dbUtil = require("./src/utils/mongooseUtils");

async function startServer() {
  console.log("Connecting to db...");
  await dbUtil.connect(dbConfig);

  console.log("Db Connected!");

  console.log("Setting up routes ...");
  const routes = require("./src/routes");

  //microservice's route prefix
  app.use("/api/v1", routes);
  console.log("routes bound");

  app.listen(port, () =>
    console.log(`vehicles backend server listening on port ${port}!`)
  );
}

//needed for letting mongo container complete init (compose' "depends_on: mongodb" 
//waits until mongodb starts and NOT until it's ready) before this service is started
const delayInMillis  = 5000;  
setTimeout(startServer, delayInMillis);
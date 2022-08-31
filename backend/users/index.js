//not actually needed (since not copied .env file into container)
//require('dotenv').config({ path: require('find-config')('.env'), debug: true }); //require('dotenv').config({path:__dirname + '/./../../../.env'});

const connectionUri = require("./src/config/db.config.js");

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

const port = 8083; //const port = Number(process.env.USERS_MICROSERVICE_INTERNAL_PORT);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

//retrieve connection string from config file (.env or inside config folder)
const dbConfig = require("./src/config/db.config");
const dbUtil = require("./src/utils/mongooseUtils");

console.log("Connecting to db...");
await dbUtil.connect(dbConfig);
console.log("Connected!");

console.log("Setting up routes ...");
const routes = require("./routes");
app.use("/api/v1", routes);
console.log("routes bound");

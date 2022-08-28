//not actually needed (since not copied .env file into container)
//require('dotenv').config({ path: require('find-config')('.env'), debug: true }); //require('dotenv').config({path:__dirname + '/./../../../.env'});

const connectionUri = require('./config/db.config.js');

// Require express and create an instance of it
var express = require("express");
var app = express();

// on the request to root (localhost:3000/)
app.get("/user/", function (req, res) {
  console.log("Ricevuto una richiesta GET");
  //res.send("<b>My</b> first express http server");
});

console.log("routes bound");


const port = Number(process.env.USERS_MICROSERVICE_INTERNAL_PORT || 8083);


app.listen(port, () => console.log(`Server listening on port ${port}!`));

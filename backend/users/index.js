// Require express and create an instance of it
var express = require("express");
var app = express();

// on the request to root (localhost:3000/)
app.get("/user/", function (req, res) {
  console.log("Ricevuto una richiesta GET");
  //res.send("<b>My</b> first express http server");
});

console.log("routes bound");


const port = Number(process.env.USERS_MICROSERVICE_INTERNAL_PORT || 8083)


app.listen(port, () => console.log(`Server listening on port ${port}!`));

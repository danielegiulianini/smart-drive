// Require express and create an instance of it
var express = require('express');
var app = express();

// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
   console.log("Ricevuto una richiesta GET");
   res.send('<b>My</b> first express http server');
});
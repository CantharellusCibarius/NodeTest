// Importera
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Skapa instans av expressbiblioteket
var app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false}));

//Skapa statisk sökväg
app.use(express.static(path.join(__dirname, 'public')));

// Port för anslutning
var port =3000;

// Starta servern

app.listen(port, function(){
    console.log("Servern är startad på port " + port)
});
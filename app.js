// Importera
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Skapa instans av expressbiblioteket
var app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false}));

// Skapa statisk sökväg
app.use(express.static(path.join(__dirname, 'public')));

// Skapar data i array
var cars = [
    {
        id: 1,
        make: "Saab",
        model: "9000",
        color: "Röd"
    },
    {
        id: 2,
        make: "Volvo",
        model: "240",
        color: "Röd"
    },
    {
        id: 3,
        make: "Opel",
        model: "Kadett",
        color: "Blå"
    }
]

// Router, REST-api för data

// Skicka data
app.get("/api/data", function(req, res){
    res.send(cars);
});

// Lägga till data
app.post("/api/data/add", function(req, res){
    // Hämta nästa id
    var newId = getNextId(cars);

    // Skapa ett nytt objekt
    var newCar = {
        id: newId,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color
    }

    // Lägga till i arrayen
    cars.push(newCar);

    //res.send({"message": "Lägger till data..."});

    res.redirect("/");
});

// Ta bort data
app.delete("/api/data/delete/:id", function(req, res){
    var deleteId = req.params.id;

    // Leta efter rätt id och radera
    for(var i=0; i<cars.length; i++) {
        if(cars[i].id == deleteId) {
            cars.splice(i, 1);
        }
    }

    res.send({"message": "Raderar data med id" + deleteId});
});
// Plocka fram högsta id
function getNextId(arr) {
    var max =0;

    for(var i=0; i<cars.length; i++) {
        var current =parseInt(arr[i].id);
        if(current > max) { max = current; }
    }

    return max +1;
}

// Port för anslutning
var port =3000;

// Starta servern

app.listen(port, function(){
    console.log("Servern är startad på port " + port)
});
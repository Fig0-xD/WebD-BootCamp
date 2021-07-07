const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("<h1>Hello World!</h1>");
});

app.get("/contact", function (req, res) {
   res.send("Contact me at: sd.19U10005@btech.nitdgp.ac.in");
});

app.get("/about", function (req, res) {
   res.send("I am a Software sophomore at NIT Durgapur.")
});

app.get("/hobbies", function (req, res) {
   res.send("Here contains a list of my hobbies:<br>Empty! xD")
});

app.listen(3000, function(){
   console.log("Server started with port 3000.");
});
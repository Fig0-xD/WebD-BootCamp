const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

   let n1 = Number(req.body.num1);
   let n2 = Number(req.body.num2);
   let result = n1 + n2;

   res.send("The result is: " + result);
});



app.get("/bmicalculator", function (req, res) {
   res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function (req, res) {

   let wt = parseFloat(req.body.weight);
   let ht = parseFloat(req.body.height);
   let bmi = wt / (ht * ht);

   res.send("Your BMI is " + bmi);
});

app.listen(3000, function () {
   console.log("Server started at port 3000");
});
const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    const cityName = req.body.cityName;
    const apiKey = "6135ecd6284bb6af548741c123fe9827";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write(`<h1>The temperature in ${cityName} is ${temp} degree Celsius.</h1>`);
            res.write(`<h3>The weather currently is ${weatherDescription}.</h3>`);
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000.");
});
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {

    const query = req.body.CityName;
    const AppId = "0f5213284a41dea2b611538584de8310";
    const unit = "metric";
    // API URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + AppId + "";
    https.get(url, (response) => {
        console.log(response.statusCode);


        response.on("data", (data) => {
            console.log(data);

            // JSON.parse is used to Convert Any Type of data into -----> json format
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<h1>The Temperature in " + city + " is : " + Math.ceil(temp) + "C" + "</h1>")
            res.write("<h2>The Weather is currently " + weatherDescription + "</h2>");
            res.write("<img src=" + imageURL + ">")
            res.send();
        })
    });


})




app.listen(3000, () => {
    console.log("Sever Started On Port 3000.")
})
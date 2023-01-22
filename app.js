
const express = require("express");
const https = require("https");
const { url } = require("inspector");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html")
   
})

app.post("/", function(req, res){
    // res.send("post req received.")
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "1c7b2977e4f9a569221e284f1c4c68ae";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&Unit=" + unit;

https.get(url , function(response){
  console.log(response.statusCode)
  console.log(response.statusMessage) 

  response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<p>The weather is currently " + weatherDescription + "</p>")
    res.write(`<h1>The temperature in ${query} is  ${temp} Degree Celcius.</h1>`)
    res.write("<img src=" + imgURL +">")
    res.send()
    // console.log(temp)
    // console.log(weatherDescription)


    // const Object = {
    //     name: "mehajabin nadaf",
    //     education: "B.Tech"
    // }
    // console.log(JSON.stringify(Object));
  })

})

})


// //    res.send("server is up and running");



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
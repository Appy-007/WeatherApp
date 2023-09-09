const express = require("express");
const app=express();
app.use(express.static('public'));
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/",function(req,res){
    const query=req.body.city;
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=d591e113dc2401ee7f54b7d566fa8046&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const feels_like=weatherData.main.feels_like;
            const icon=weatherData.weather[0].icon;
            const weatherDescription=weatherData.weather[0].description;
            const iconImg= "https://openweathermap.org/img/wn/" +icon +"@2x.png";
            res.write("<h1>The temperature in "+ query+" is " +temp+" degree Celcius</h1>");
            res.write("<p>Feels like: " +feels_like +" degree Celcius.</p>");
            res.write("<p>Description: "+ weatherDescription+"</p>");
            res.write("<img src=" + iconImg + " >");
            res.send();
        })
    })
})

app.listen(7000 , function(){
    console.log("Server is running at port 7000");
})




// d591e113dc2401ee7f54b7d566fa8046
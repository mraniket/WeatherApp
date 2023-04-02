const fs = require("fs");
const http = require("http");
const request = require("requests");


const homeFile = fs.readFileSync("weatherhome.html", "utf-8");
const replaceVal =(temprory, orgVal)=>{
    let temprature = temprory.replace("{%Temprature%}", orgVal.main.temp)
     temprature = temprature.replace("{%tempMin%}", orgVal.main.temp_min)
     temprature = temprature.replace("{%tempMax%}", orgVal.main.temp_max)
     temprature = temprature.replace("{%location%}", orgVal.name)
    return temprature;}
const server = http.createServer((req, res)=>{
    console.log("HELLO SERVER STARTED");
    request("https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=018e6e5dfebc4f5d1cb38dd0a52da93d")
    .on("data", (chunk)=>{
        const objData = JSON.parse(chunk)
        const api = [objData]
        const realTimeData = api.map((val)=>
            replaceVal(homeFile, val)).join("");     
            res.write(realTimeData);
    })
    .on("end", (err)=>{
        console.log(err);
        res.end();
    })
})
server.listen(8000, "127.0.0.1");
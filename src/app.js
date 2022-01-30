const path = require("path");
const express = require("express");

const utils = require("./utils/utils");
const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: "Please enter location"
        })
    }
    utils.geocode(address, (error, {latitude, longitude} = {}) => { // {latitude, longitude} = {} is an example of default function parameter
        if(error) {
            return res.send({
                //error: error
                error    // object property shorthand
            })
        }
        utils.getWeatherForecast(latitude, longitude, (error, dataFromGetWeatherForecast) => {
            if(error) {
                return res.send({
                    error: "unable to fetch forecast. please try again later"
                })
            }
            const response = dataFromGetWeatherForecast;
            const data = response.body;
            const temperature = data.current.temperature;
            const precip = data.current.precip;
            const weatherArray = data.current.weather_descriptions;
            const weatherForecast = weatherArray[0];
            const message = "It is currently " + temperature + " degrees out. There is a " + precip + "% chance of rain ";
            const weatherForecastMessage = message + "and it's " + weatherForecast;
            res.send(
                {
                    forecast: weatherForecastMessage,
                    address: address,
                    location: address
                }
            );
        });
    });
});

app.listen(port, () => {
    console.log("server is up");
});
const request = require("request");

const geocode = (address, callback) => {
    const url_lat_lon = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJpeWFtOTEiLCJhIjoiY2thMnc0eml5MDBsOTNmbzV3cHlhcXR3YiJ9.PUhq4j7glo_7ut14iSo5Hw';
    request({url: url_lat_lon, json: true}, (error, response) => {
        if(error) {
            callback("An error occured!", undefined);
        }
        else if(response.body.error) {
            callback("An error occured. Please try again later.", undefined);
        }
        else if(response.body.message) {
            callback("can't find the location", undefined);
        }
        else {
            const longit = response.body.features[0].geometry.coordinates[0];
            const lat = response.body.features[0].geometry.coordinates[1];
            const geocodes = {
                longitude: longit,
                latititude: lat
            };
            callback(undefined, geocodes);
        }
    });
};

const getWeatherForecast = (lat, longit, callback) => {  
    const url = 'http://api.weatherstack.com/forecast?access_key=7e733be54d7ec8ad270e07daec878434&query='+lat+','+longit;
    request({url, json: true}, (error, response) => {
        //const data = JSON.parse(response.body); // if we use json: true then no need to parse it
        if(error) {
            callback("An error occured!", undefined);
        }
        else if(response.body.error) {
            callback("An error occured. Please try again later.", undefined);
        }
        else if(response.body.message) {
            callback("can't find the location", undefined);
        }
        else {
            callback(undefined, response);
        }
    });
};

module.exports = {
    geocode: geocode,
    getWeatherForecast: getWeatherForecast
}
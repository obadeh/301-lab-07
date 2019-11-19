'use strict'

// npm packages - 3rd party

// npm packages - 3rd party

// DOTENV (Read our Environment Variables) -- UpperCase
require('dotenv').config()

// Express Server
// Express does all the headers (envelope stuff)
const express = require('express');

// CORS = Cross Origin Resource Sharing
const cors = require('cors');

// application constant
const app = express();
const PORT = process.env.PORT || 3000;

app.use( cors() );

app.get('/location', (request, response) => {
    // send the users current location back to them
    const geoData = require('./data/geo.json');
    const city = request.query.data;
    const locationData = new Location(city, geoData);
    
    response.send(locationData);
  });
  
  function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
  }
  
  


  app.get('/weather',(request,response) => {
      //send the users the weather forecast
      const weathData= require('./data/darksky.json')
    //   const city = request.query.data;
      const weatherData=new Weather(weathData)

      response.send(weatherData);

  });

  function Weather(weathData){

    this.forecast=weathData.daily.data[0].summary;
    this.time=weathData.daily.data[0].time;
  }





  // When an error happens ...
app.use('*', (request, response) =>{
    response.status(404).send('Not Found');
  });
  
  app.use( (error, request, response) => {
    response.status(500).send(error);
  });


  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
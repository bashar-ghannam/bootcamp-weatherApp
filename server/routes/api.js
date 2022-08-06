const express = require('express');
const router = express.Router();
const City = require('../models/City');
const axios = require('axios');

router.get('/city/:cityName', function (request, response) {
  const cityName = request.params.cityName;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=245b623f4546c020246a1a40a7f5071d`
    )
    .then(function (res) {
      response.send(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post('/city', function (request, response) {
  const cityInfo = request.body;
  if (Object.keys(cityInfo).length !== 0) {
    const city = new City({
      name: cityInfo.name,
      temperature: cityInfo.temperature,
      condition: cityInfo.condition,
      conditionPic: cityInfo.conditionPic,
    });
    city.save();
    response.end();
  }
});

router.delete('/city/:cityName', function (request, response) {
  let cityName = request.params.cityName;
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  City.find({ name: `${cityName}` }, function (err, cities) {
    cities.forEach((city) => {
      city.remove();
    });
  });
  response.end();
});

router.get('/cities', function (request, response) {
  City.find({}, function (err, cities) {
    response.send(cities);
  });
});

module.exports = router;

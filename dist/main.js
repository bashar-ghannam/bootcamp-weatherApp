const weatherCitiesRender = new Render();
const weatherCitiesModel = new Model();
const inputCityName = $('#city-name');
const searchBtn = $('#search-btn');
const container = $('.citiesWeather');

const loadPage = async function () {
  weatherCitiesModel.getDataFromDB().then(function () {
    weatherCitiesRender.renderData(weatherCitiesModel.cityData);
  });
};

window.onload = function () {
  loadPage();
};

const handleSearch = async function (cityName) {
  await weatherCitiesModel.getCityData(cityName);
  weatherCitiesRender.renderData(weatherCitiesModel.cityData);
};

searchBtn.on('click', function () {
  const cityName = inputCityName.val();
  if (cityName) {
    handleSearch(cityName);
    inputCityName.val('');
  }
});

container.on('click', '#add-btn', async function () {
  const cityName = $(this).closest('.weatherItem').find('.cityName').text();
  await weatherCitiesModel.saveCity(cityName);
  weatherCitiesRender.renderData(weatherCitiesModel.cityData);
});

container.on('click', '#remove-btn', async function () {
  const cityName = $(this).closest('.weatherItem').find('.cityName').text();
  await weatherCitiesModel.removeCity(cityName);
  weatherCitiesRender.renderData(weatherCitiesModel.cityData);
});

class Model {
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    let c = [];
    await $.get('/cities', function (cities) {
      cities.forEach((cityWeather) => {
        c.push({
          name: cityWeather.name,
          temperature: cityWeather.temperature,
          condition: cityWeather.condition,
          conditionPic: cityWeather.conditionPic,
          IsExistInDB: true,
        });
      });
    });
    this.cityData = c;
  }

  async getCityData(cityName) {
    let newCity;
    await $.get(`/city/${cityName}`, function (cityWeather) {
      newCity = {
        name: cityWeather.name,
        temperature: (cityWeather.main.temp - 273).toPrecision(3),
        condition: cityWeather.weather[0].main,
        conditionPic: cityWeather.weather[0].icon,
        IsExistInDB: false,
      };
    });
    this.cityData.push(newCity);
  }

  saveCity(cityName) {
    const city = this.cityData.find((city) => city.name === cityName);
    const cityWeather = {
      name: city.name,
      temperature: city.temperature,
      condition: city.condition,
      conditionPic: city.conditionPic,
    };
    $.post('/city', cityWeather, function (response) {});
    city.IsExistInDB = true;
  }

  removeCity(cityName) {
    const city = this.cityData.find((city) => city.name === cityName);
    $.ajax({
      url: `city/${cityName}`,
      method: 'DELETE',
      success: function () {},
    });
    city.IsExistInDB = false;
  }
}

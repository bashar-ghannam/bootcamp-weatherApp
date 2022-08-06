class Render {
  constructor() {
    this.renderDiv = $('.citiesWeather');
    this.Template = $('#weather-template');
  }
  renderData(cities) {
    this.renderDiv.empty();
    const source = this.Template.html();
    const template = Handlebars.compile(source);
    const newHTML = template({ cities });
    this.renderDiv.append(newHTML);
  }
}

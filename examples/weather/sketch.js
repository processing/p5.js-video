// We're going to store the temperature
var temperature = 0;
// We're going to store text about the weather
var weather = "";

function setup() {
  createCanvas(480, 480);

  // The URL for the JSON data (replace "imperial" with "metric" for celsius)
  var url = "http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial";

  // Load the XML document
  loadJSON(url, loaded);
}

function loaded(data) {
  // Get the temperature
  temperature = data.main.temp;

  // Grab the description, look how we can "chain" calls.
  weather = data.weather[0].description;
}

function draw() {
  background(255);
  fill(0);

  // Display all the stuff we want to display
  text("City: New York", 10, 50);
  text("Current temperature: " + temperature, 10, 70);
  text("Forecast: " + weather, 10, 90);
}
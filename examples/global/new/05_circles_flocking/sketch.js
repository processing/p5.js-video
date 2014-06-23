// 1:13

var flock;
var flocking = false;

var wind = new p5.Vector();//createVector(0,0,0);
var basewind = new p5.Vector();
var gust = new p5.Vector();

function setup() {
  createCanvas(displayWidth,displayHeight);
  flock = new Flock();
  // For now
  addBoids();
  flockit();
  getWeather();
}

function draw() {
  clear();
  if (!flocking) {
    stroke(0);
    fill(0,100);
    ellipse(width/4,height/4,128,128);
  }

  flock.display();
  
  if (flocking) {
    flock.applyForce(wind);
    flock.seek(mouseX,mouseY);
    flock.run();
  }
  
  if (random(1) < 0.2) {
    wind.lerp(gust,0.1);
  } else {
    wind.lerp(basewind,0.1);
  }
  drawVector(wind,600,120,1000);
}

// Trigger with popcorn?
function addBoids() {
  while (flock.boids.length < 100) {
    var boid = new Boid(random(width),random(height));
    flock.addBoid(boid);
  }
}

// Trigger with popcorn?
function flockit() {
  flocking = true;
}

// Trigger with popcorn?
function getWeather() {
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=NewYork,USA&units=imperial', gotWeather);
}

function gotWeather(weather) {
  console.log(weather);
  var dir = Number(weather.wind.deg);
  var windmag = Number(weather.wind.speed);
  var gustmag = Number(weather.wind.gust);
  println(windmag,gustmag);

  var img = createImg('http://openweathermap.org/img/w/'+weather.weather[0].icon+'.png');
  img.position(550,100);

  var weatherP = createP('In NYC, the weather is ' + weather.weather[0].main.toLowerCase() + ' with a temperature of ' + floor(weather.main.temp) + ' degrees farenheit.');
  weatherP.position(100,100);

  var windP = createP('The wind is blowing at ' + windmag + ' miles per hour with gusts up to ' + gustmag + '.');
  windP.position(100,120);

  basewind = p5.Vector.fromAngle(radians(dir));
  basewind.mult(windmag/100);
  gust = p5.Vector.fromAngle(radians(dir));
  gust.mult(gustmag/100);
}



// Renders a vector object 'v' as an arrow and a location 'loc'
function drawVector(v,x,y,scayl) {
  if (v.mag() > 0) {
    pushMatrix();
    var arrowsize = 4;
    // Translate to location to render vector
    translate(x,y);
    // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.mag()*scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(-len/2,0,len/2,0);
    line(len/2,0,len/2-arrowsize,+arrowsize/2);
    line(len/2,0,len/2-arrowsize,-arrowsize/2);
    popMatrix();
  }
}

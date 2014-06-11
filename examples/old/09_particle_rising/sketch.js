
// 3:24

var y;
var yspeed = 0;
var gravity = 0.1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  y = height;
  yspeed = -10;
}

function draw() {
  clear();
  fill(0);
  stroke(0);
  ellipse(100,y,8,8);

  y = y + yspeed;
  yspeed = yspeed + gravity;


  if (yspeed > 0) {
    y = 5000;
  }
}
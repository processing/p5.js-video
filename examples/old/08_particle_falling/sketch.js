
// 3:14

var y = 200;
var yspeed = 0;
var gravity = 0.1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  clear();
  fill(0);
  stroke(0);
  ellipse(100,y,8,8);

  y = y + yspeed;
  yspeed = yspeed + gravity;


  if (y > height) {
    y = 200;
    yspeed = 0;
  }
}
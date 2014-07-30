
var x;
var y;

function setup() {
  createCanvas(480, 480);
  x = 240;
  y = 240;
}

function draw() {
  background(255);
  
  stroke(50);
  fill(100);
  ellipse(x, y, 24, 24);
  
  x = x + random(-1, 1);
  y = y - 1;
  
  if (y < 0) {
    y = 480;
  }
}


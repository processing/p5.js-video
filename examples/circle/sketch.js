
var col;

function setup() {
  createCanvas(480, 480);
  col = color(random(255), random(255), random(255));
}

function draw() {
  background(255);
  stroke(51);
  fill(col);
  ellipse(240,240,200,200);
}

function mousePressed() {
  var d = dist(mouseX, mouseY, 240, 240);
  if (d < 100) {
    col = color(random(255), random(255), random(255));
  }
}
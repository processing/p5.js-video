
var points = [];

function setup() {
  createCanvas(480, 480);
}

function draw() {
  background(255);
  noFill();
  beginShape();
  for (var i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();

  for (var i = 0; i < points.length; i+=4) {
    ellipse(points[i].x, points[i].y, 4, 4);
  }
}

function mouseDragged() {
  points.push(createVector(mouseX,mouseY));
}
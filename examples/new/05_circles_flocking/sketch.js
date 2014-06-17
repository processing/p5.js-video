// 1:13

var flock;
var flocking = false;

function setup() {
  createCanvas(640,360);
  flock = new Flock();
  // For now
  addBoids();
  flockit();
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
    flock.run();
  }
}

// Trigger with popcorn?
function addBoids() {
  while (flock.boids.length < 125) {
    var boid = new Boid(random(width),random(height));
    flock.addBoid(boid);
  }
}

// Trigger with popcorn?
function flockit() {
  flocking = true;
 
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.display = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].display();  // Passing the entire list of boids to each boid individually
  }
};

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
};

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
};

Flock.prototype.applyForce = function(f) {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].applyForce(f);  // Passing the entire list of boids to each boid individually
  }
};

Flock.prototype.seek = function(x,y) {
  for (var i = 0; i < this.boids.length; i++) {
    var v = this.boids[i].seek(new PVector(x,y));  // Passing the entire list of boids to each boid individually
    this.boids[i].applyForce(v);
  }
};

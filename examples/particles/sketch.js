var particles = [];

function setup() {
  createCanvas(480, 480);
}

function draw() {
  background(51);
  particles.push(new Particle(createVector(width/2, 50)));

  // Looping through backwards to delete
  for (var i = particles.length-1; i >= 0; i--) {
    var p = particles[i];
    p.run();
    if (p.isDead()) {
      // Remove the particle
      particles.splice(i, 1);
    }
  }

}

var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.get();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(255, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
      return true;
  } else {
    return false;
  }
};
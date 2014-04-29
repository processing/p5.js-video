
// 3:45

var gravity = 0.1;

var particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  if (random(1) < 0.1) {
    particles.push(new Particle());
  }
  clear();

  for (var i = particles.length-1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].finished()) {
      particles.splice(i,1);
    }
  }

}

function Particle() {
  this.x = random(width);
  this.y = height;
  this.yspeed = random(-12,-5);
}

Particle.prototype.finished = function() {
  return this.yspeed > 0;
}

Particle.prototype.update = function() {
  this.y = this.y + this.yspeed;
  this.yspeed = this.yspeed + gravity;
}

Particle.prototype.display = function() {
  fill(0);
  stroke(0);
  ellipse(this.x,this.y,8,8);
}
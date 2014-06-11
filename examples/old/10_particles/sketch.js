
function ready() {
  sketch = new p5(paticlesSketch, "#defaultCanvas");
}

var paticlesSketch = function( sketch ) {

  sketch.gravity = 0.1;
  sketch.particles = [];

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
  }

  sketch.draw = function draw() {
    if (sketch.random(1) < 0.1) {
      sketch.particles.push(new sketch.Particle());
    }
    sketch.clear();

    for (var i = sketch.particles.length-1; i >= 0; i--) {
      sketch.particles[i].update();
      sketch.particles[i].display();

      if (sketch.particles[i].finished()) {
        sketch.particles.splice(i,1);
      }
    }
  }

  sketch.Particle = function() {
    this.x = sketch.random(sketch.width);
    this.y = sketch.height;
    this.yspeed = sketch.random(-12,-5);
  }

  sketch.Particle.prototype.finished = function() {
    return this.yspeed > 0;
  }

  sketch.Particle.prototype.update = function() {
    this.y = this.y + this.yspeed;
    this.yspeed = this.yspeed + sketch.gravity;
  }

  sketch.Particle.prototype.display = function() {
    sketch.fill(0);
    sketch.stroke(0);
    sketch.ellipse(this.x,this.y,8,8);
  }


};



// 3:45

/*

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

*/
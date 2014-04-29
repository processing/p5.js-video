
// 3:45

var gravity = 0.1;

var particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  if (random(1) < 0.02) {
    particles.push(new Particle());
  }
  clear();

  for (var i = particles.length-1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].finished()) {
      if (particles[i].seed) {
        for (var j = 0; j < 100; j++) {
          particles.push(new Particle(particles[i].x,particles[i].y));
        }
      }
      particles.splice(i,1);
    }
  }

}

function Particle(x,y) {
  this.x = x || random(width);
  this.y = y || height;
  this.fade = 255;
  if (x) {
    var a = random(TWO_PI);
    var r = random(2,2.5);
    this.xspeed = r*cos(a);
    this.yspeed = r*sin(a);
  } else {
    this.xspeed = 0;
    this.yspeed = random(-12,-5);
    this.seed = true;
  }
}


Particle.prototype.finished = function() {
  if (this.seed) {
    return this.yspeed > 0;
  } else {
    return this.y > height;
  }
}

Particle.prototype.update = function() {
  this.x = this.x + this.xspeed;
  this.y = this.y + this.yspeed;
  if (this.seed) {
    this.yspeed = this.yspeed + gravity;
  } else {
    this.yspeed = this.yspeed + gravity*0.2;
    this.fade -= 3;
    this.fade = constrain(this.fade,1,255);
  }

}

Particle.prototype.display = function() {
  fill(0,this.fade);
  stroke(0,this.fade);
  ellipse(this.x,this.y,8,8);
}

function ready() {
  sketch = new p5(fireworkSketch, "#defaultCanvas");
}

var fireworkSketch = function( sketch ) {
  sketch.gravity = 0.1;
  sketch.auto = true;
  sketch.particles = [];

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
  }

  sketch.draw = function() {
    if (sketch.random(1) < 0.02 && sketch.auto) {
      sketch.particles.push(new sketch.Particle());
    }
    sketch.clear();

    for (var i = sketch.particles.length-1; i >= 0; i--) {
      sketch.particles[i].update();
      sketch.particles[i].display();

      if (sketch.particles[i].finished()) {
        if (sketch.particles[i].seed) {
          for (var j = 0; j < 100; j++) {
            sketch.particles.push(new sketch.Particle(sketch.particles[i].x,sketch.particles[i].y));
          }
        }
        sketch.particles.splice(i,1);
      }
    }

  }

  sketch.Particle = function(x,y) {
    this.x = x || sketch.random(sketch.width);
    this.y = y || sketch.height;
    this.fade = 255;
    if (x) {
      var a = sketch.random(sketch.TWO_PI);
      var r = sketch.random(2,2.5);
      this.xspeed = r*sketch.cos(a);
      this.yspeed = r*sketch.sin(a);
    } else {
      this.xspeed = 0;
      this.yspeed = sketch.random(-12,-5);
      this.seed = true;
    }
  }


  sketch.Particle.prototype.finished = function() {
    if (this.seed) {
      return this.yspeed > 0;
    } else {
      return this.y > sketch.height;
    }
  }

  sketch.Particle.prototype.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    if (this.seed) {
      this.yspeed = this.yspeed + sketch.gravity;
    } else {
      this.yspeed = this.yspeed + sketch.gravity*0.2;
      this.fade -= 3;
      this.fade = sketch.constrain(this.fade,1,255);
    }
  }

  sketch.Particle.prototype.display = function() {
    sketch.fill(0,this.fade);
    sketch.stroke(0,this.fade);
    sketch.ellipse(this.x,this.y,8,8);
  }

  sketch.mousePressed = function() {
    sketch.auto = false;

    sketch.particles.push(new sketch.Particle(sketch.mouseX,sketch.mouseY));
 
}

}
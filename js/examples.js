var shapeSketch = function( sketch ) {

  sketch.counter = 0;
  sketch.baseHue = .5;

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);    
    sketch.noStroke();
    
  };

  sketch.draw = function() {

      var size = 100 + sketch.random(100),
          hue = (sketch.baseHue + sketch.random(-.1,.1));
      
      sketch.colorMode(sketch.HSB);
      sketch.fill(hue, .5, .5, 128);

      sketch.ellipse(
        sketch.random(sketch.width),
        sketch.random(sketch.height),
        size, size);

      sketch.counter++;

      if (sketch.counter > 50) sketch.noLoop();

  }

  return sketch;

}








var rectangleArraySketch = function( sketch ) {

  sketch.rectangles = [];
  sketch.counter = 0;

  sketch.setup = function() {
    sketch.createCanvas($(window).width(), $(window).height());    

    for (var i = 0; i < 150; i++) {
      sketch.rectangles[i] = {
        x: sketch.random(sketch.width),
        y: sketch.random(sketch.height),
        w: sketch.random(5,100),
        h: sketch.random(5,100)
      };
    }

  };

  sketch.draw = function() {

    sketch.clear();
    for (var i = 0; i < sketch.counter; i++) {
      var r = sketch.rectangles[i];
      sketch.fill(0,50);
      sketch.rect(r.x,r.y,r.w,r.h);
    }

    sketch.counter++;
    if (sketch.counter > sketch.rectangles.length) {
      sketch.counter = sketch.rectangles.length;
    }

  }

  sketch.title = "Rectangles"
  sketch.exampleDiv ="#rectangleArraySketch";

  return sketch;
};

var textSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas($(window).width(), $(window).height());
  };

  sketch.draw = function() {

  }

  sketch.title = "Text"
  sketch.exampleDiv ="#textSketch";

  return sketch;
};

var particleSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
  };

  sketch.draw = function() {
    
    var relativePosition = {
      x: (window.innerWidth/2) - 250,
      y: window.innerHeight - 487
    }

    sketch.clear();
    sketch.fill(0);
    sketch.stroke(0);
    sketch.ellipse(relativePosition.x,relativePosition.y,8,8);
  };

  sketch.title = "Single Particle"

  return sketch;
};  

var paticleFallSketch = function( sketch ) {

  sketch.y = 0;
  sketch.yspeed = 0;
  sketch.gravity = 0.1;

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
  };

  sketch.draw = function() {
  
    var relativePosition = {
      x: (window.innerWidth/2) - 250,
      y: window.innerHeight - 487
    }  

    sketch.clear();
    sketch.fill(0);
    sketch.stroke(0);
    sketch.ellipse(relativePosition.x, relativePosition.y + sketch.y,8,8);

    sketch.y = sketch.y + sketch.yspeed;
    sketch.yspeed = sketch.yspeed + sketch.gravity;

    if (relativePosition.y + sketch.y > window.innerHeight) {
      sketch.y = 0;
      sketch.yspeed = 0;
    }
  }  

  sketch.title = "Falling Particle"

  return sketch;
};

var paticleRiseSketch = function( sketch ) {

  sketch.y = 487;
  sketch.yspeed = 0;
  sketch.gravity = -0.1;

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
  };

  sketch.draw = function() {
  
    var relativePosition = {
      x: (window.innerWidth/2) - 250,
      y: window.innerHeight - 487
    }  

    sketch.clear();
    sketch.fill(0);
    sketch.stroke(0);
    sketch.ellipse(relativePosition.x, relativePosition.y + sketch.y,8,8);

    sketch.y = sketch.y + sketch.yspeed;
    sketch.yspeed = sketch.yspeed + sketch.gravity;

    if (relativePosition.y + sketch.y < relativePosition.y) {
      sketch.y = 487;
      sketch.yspeed = 0;
    }
  }  

  sketch.title = "Falling Particle"

  return sketch;
};  

/**
 * Multiple Particles Example
 */

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

/**
 * Firework Example
 */

var fireworkSketch = function( sketch ) {
  sketch.gravity = 0.1;

  sketch.particles = [];

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
  }

  sketch.draw = function() {
    if (sketch.random(1) < 0.02) {
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
}
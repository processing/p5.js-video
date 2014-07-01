// Flocking Sketch
'use strict';

var flockingSketch = function( sketch ) {

  sketch.flock;
  sketch.flocking = false;

  sketch.wind = new p5.Vector();
  sketch.basewind = new p5.Vector();
  sketch.gust = new p5.Vector();  

  sketch.maxDistance = Math.sqrt( Math.pow(window.innerWidth,2),  Math.pow(window.innerHeight,2));

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth,window.innerHeight);
    sketch.flock = new sketch.Flock();

    //sketch.startFlocking(); // Called by Popcorn
    //sketch.getWeather(); // Called by Popcorn
  }

  sketch.draw = function() {
    sketch.clear();

    if (sketch.flock.boids.length < 50) {
      var boid = new sketch.Boid(sketch.random(sketch.width),sketch.random(sketch.height));
      sketch.flock.addBoid(boid);      
    }

    sketch.flock.display();
    
    if (sketch.flocking) {
      sketch.flock.applyForce(sketch.wind);
      sketch.flock.repel(sketch.mouseX,sketch.mouseY);
      sketch.flock.run();
    }
    
    if (sketch.random(1) < 0.2) {
      sketch.wind.lerp(sketch.gust,0.1);
    } else {
      sketch.wind.lerp(sketch.basewind,0.1);
    }

    //sketch.drawVector(sketch.wind,600,120,1000);
  }  

  sketch.startFlocking = function() {
    sketch.flocking = true;
  }

  sketch.getWeather = function() {
    sketch.loadJSON('http://api.openweathermap.org/data/2.5/weather?q=NewYork,USA&units=imperial', sketch.gotWeather);
  }

  sketch.gotWeather = function(weather) {
    console.log(weather);
    var dir = Number(weather.wind.deg);
    var windmag = Number(weather.wind.speed);
    var gustmag;
    if (weather.wind.gust)
      gustmag = Number(weather.wind.gust);
    else
      gustmag = windmag;


    // Create UI
    
    var weatherElement = sketch.createDiv("");
    weatherElement.id("weather");

    var temperatureElement = sketch.createDiv("")
    temperatureElement.id("temperature");
    temperatureElement.parent("weather");

    var windElement = sketch.createDiv("");
    windElement.id("wind");
    windElement.parent("weather");

    var speedElement = sketch.createDiv("");
    speedElement.id("speed");
    speedElement.parent("wind");

    var gustElement = sketch.createDiv("");
    gustElement.id("gust");
    gustElement.parent("wind");        

    var gaugeElement = sketch.createDiv("");
    gaugeElement.id("gauge");
    gaugeElement.parent("weather");    
 
    // Setup UI

    sketch.getElement("temperature").html(sketch.floor(weather.main.temp)+'&deg;');
    sketch.getElement("speed").html("WIND " + windmag + " <small>MPH</small>");
    sketch.getElement("gust").html("GUST " + gustmag + " <small>MPH</small>");

    sketch.getElement("gauge").elt.style.transform = 'rotate('+dir+'deg)';
    sketch.getElement("gauge").elt.style['-webkit-transform'] = 'rotate('+dir+'deg)';
    sketch.getElement("weather").show();

    // Create vectors for animation

    sketch.basewind = p5.Vector.fromAngle(sketch.radians(dir-90)); // Had to offset by 90 degrees. Bug?
    sketch.basewind.mult(windmag/100);
    sketch.gust = p5.Vector.fromAngle(sketch.radians(dir-90));
    sketch.gust.mult(gustmag/100);

  }

  /*
  sketch.drawVector = function(v,x,y,scayl) {
    if (v.mag() > 0) {
      sketch.pushMatrix();
      var arrowsize = 4;
      // Translate to location to render vector
      sketch.translate(x,y);
      // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
      sketch.rotate(v.heading());
      // Calculate length of vector & scale it to be bigger or smaller if necessary
      var len = v.mag()*scayl;
      // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
      sketch.line(-len/2,0,len/2,0);
      sketch.line(len/2,0,len/2-arrowsize,+arrowsize/2);
      sketch.line(len/2,0,len/2-arrowsize,-arrowsize/2);
      sketch.popMatrix();
    }
  }
  */
 
  // Flock Class

  sketch.Flock = function () {
    this.boids = [];
  }

  sketch.Flock.prototype.display = function() {
    for (var i = 0; i < this.boids.length; i++) {
      sketch.colorMode(sketch.HSB, 100);
      sketch.strokeWeight(2);
      this.boids[i].display();  // Passing the entire list of boids to each boid individually
    }
  };

  sketch.Flock.prototype.run = function() {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
    }
  };

  sketch.Flock.prototype.addBoid = function(b) {
    this.boids.push(b);
  };

  sketch.Flock.prototype.applyForce = function(f) {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].applyForce(f);  // Passing the entire list of boids to each boid individually
    }
  };

  sketch.Flock.prototype.repel = function(x,y) {
    for (var i = 0; i < this.boids.length; i++) {
      var target = new p5.Vector(x,y);
      var dis = p5.Vector.dist(target,this.boids[i].position);
      if (dis < 100) { 
        var v = this.boids[i].seek(new p5.Vector(x,y));  // Passing the entire list of boids to each boid individually
        v.mult(-1000/dis);
        this.boids[i].applyForce(v);
      }
    }
  };

  // Boid Class

  sketch.Boid = function(x,y) {
    this.sum = new p5.Vector(0,0);
    this.zero = new p5.Vector(0,0);

    this.acceleration = new p5.Vector(0,0);
    this.velocity = new p5.Vector(sketch.random(-1,1),sketch.random(-1,1));
    this.position = new p5.Vector(x,y);
    this.r = 16.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  sketch.Boid.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
  };

  sketch.Boid.prototype.applyForce = function(force) {
    this.acceleration.add(force);
  };

  sketch.Boid.prototype.flock = function(boids) {
    var sep = this.separate(boids);   // Separation
    var ali = this.align(boids);      // Alignment
    var coh = this.cohesion(boids);   // Cohesion
    //Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    //Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  };

  sketch.Boid.prototype.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  };

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  sketch.Boid.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  };

  sketch.Boid.prototype.display = function() {
    
    var mouseDistance = sketch.dist(this.position.x, this.position.y, sketch.mouseX, sketch.mouseY)
    var mappedColor = sketch.map(mouseDistance, 0, sketch.maxDistance,  80, 50);
    //var mappedSize = sketch.map(mouseDistance, 0, sketch.maxDistance,  32,8);
    // Draw a triangle rotated in the direction of velocity
    
    sketch.fill(mappedColor, 100, 100, 50);
    sketch.stroke(mappedColor, 100, 100);
    sketch.ellipse(this.position.x,this.position.y,this.r,this.r);
  };


  // Wraparound
  sketch.Boid.prototype.borders = function() {

    if (this.position.x < -this.r)  this.position.x = sketch.width  + this.r;
    if (this.position.y < -this.r)  this.position.y = sketch.height + this.r;
    if (this.position.x > sketch.width + this.r) this.position.x = -this.r;
    if (this.position.y > sketch.height + this.r) this.position.y = -this.r;
  };

  // Separation
  // Method checks for nearby boids and steers away
  sketch.Boid.prototype.separate = function(boids) {
    var desiredseparation = 25.0;
    var steer = new p5.Vector(0,0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position,boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position,boids[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        steer.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  };

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  sketch.Boid.prototype.align = function(boids) {
    var neighbordist = 50;
    var sum = new p5.Vector(0,0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum,this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return new p5.Vector(0,0);
    }
  };

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  sketch.Boid.prototype.cohesion = function(boids) {
    var neighbordist = 50;
    this.sum.x = 0;
    this.sum.y = 0;
    //var sum = new PVector(0,0);   // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        this.sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      this.sum.div(count);
      return this.seek(this.sum);  // Steer towards the location
    } else {
      return this.zero;
    }
  };

  // Return
  
  sketch.title = "Flocking";
  sketch.exampleDiv ="#circleSliderSketch";  

  return sketch;
};

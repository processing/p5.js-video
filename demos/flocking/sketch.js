var flockingSketch = function( sketch ) {
  sketch.scaleFactor = 1.0;

  sketch.flock;
  sketch.boids = false;
  sketch.hue = 12;
  sketch.radius = 16;

  sketch.wind = new p5.Vector();
  sketch.basewind = new p5.Vector();
  sketch.gust = new p5.Vector();  

  sketch.staticRepelTarget = new p5.Vector();
  sketch.staticRepel = false
  sketch.mouseRepelTarget = new p5.Vector();
  sketch.mouseRepel = false; 

  sketch.hideWeather = false;
  sketch.weatherElement = null;

  sketch.setup = function() {
    sketch._pixelDensity = 1;
    sketch.createCanvas(1280,800);

    // Performance stamping an image is faster than ellipse

    sketch.circleCanvas = sketch.createGraphics(26,26);
    sketch.circleCanvas.colorMode(sketch.HSB, 100);
    sketch.circleCanvas.stroke(sketch.hue, 100,100);
    sketch.circleCanvas.fill(sketch.hue, 100,100, 80);
    sketch.circleCanvas.ellipse(13,13,24,24);

    sketch.flock = new sketch.Flock();

    sketch.createUI();

    sketch.enableStaticRepel();
    sketch.enableMouseRepel();

    //sketch.addBoids(); // Called by Popcorn
    //sketch.getWeather(); // Called by Popcorn
    //sketch.enableMouseRepel(); // Called by Popcorn

  }

  sketch.draw = function() {
    sketch.clear();

    if (sketch.boids && sketch.flock.boids.length < 100) {
      var boid = new sketch.Boid(sketch.random(sketch.width),sketch.random(sketch.height));
      sketch.flock.addBoid(boid);      
    }

    sketch.flock.display();
    //sketch.flock.applyForce(sketch.wind);
    //sketch.flock.repel(sketch.mouseX,sketch.mouseY);
    //sketch.flock.run();
    
    if (sketch.random(1) < 0.2) {
      sketch.wind.lerp(sketch.gust,0.1);
    } else {
      sketch.wind.lerp(sketch.basewind,0.1);
    }

    //sketch.drawVector(sketch.wind,600,120,1000);
  }  

  sketch.createUI = function() {

    // Create UI
    
    var weatherElement = sketch.createDiv("");
    weatherElement.id("weather");

    var weatherSpanElement = sketch.createSpan("");
    weatherSpanElement.id("weatherSpan");
    weatherSpanElement.parent("weather");

    var temperatureElement = sketch.createDiv("75&deg")
    temperatureElement.id("temperature");
    temperatureElement.parent("weatherSpan");

    var windElement = sketch.createDiv("");
    windElement.id("wind");
    windElement.parent("weatherSpan");

    var speedElement = sketch.createDiv("WIND 4 <small>MPH</small>");
    speedElement.id("speed");
    speedElement.parent("wind");

    var gustElement = sketch.createDiv("GUST 5 <small>MPH</small>");
    gustElement.id("gust");
    gustElement.parent("wind");        

    gaugeElement = sketch.createDiv("");
    gaugeElement.id("gauge");
    gaugeElement.parent("weatherSpan");  

    var gaugeCanvas = sketch.createGraphics(48,48);
    gaugeCanvas.noStroke();
    
    gaugeCanvas.fill(255);
    gaugeCanvas.ellipse(24,24,48,48);
    
    gaugeCanvas.stroke(87, 149, 196);
    gaugeCanvas.strokeWeight(3);
    gaugeCanvas.line(24,8, 24, 40);
    
    gaugeCanvas.noStroke();
    gaugeCanvas.fill(87, 149, 196);
    gaugeCanvas.triangle(24,6, 18, 14, 30, 14)

    gaugeCanvas.show(); 
    gaugeCanvas.parent("gauge");    

    weatherElement.hide();
    
    sketch.weatherElement = weatherElement;

  }

  sketch.enableStaticRepel = function() {
    sketch.staticRepel = true;
  }

  sketch.enableMouseRepel = function() {
    sketch.mouseRepel = true;
  }

  sketch.setRepelTarget = function(x,y) {
    sketch.staticRepelTarget.x = x;
    sketch.staticRepelTarget.y = y;
  }

  sketch.addCircle = function(position) {

    var boid = new sketch.Boid(position.x,position.y);
    boid.velocity.x = 1;
    boid.velocity.y = -100;
    sketch.flock.addBoid(boid); 

  }

  sketch.addBoids = function(position) {
    sketch.boids = true;
  }

  sketch.hideWeather = function() {
    if (sketch.weatherElement) sketch.weatherElement.hide();
    sketch.hideWeather = true;
  }

  sketch.getWeather = function() {
    console.log("Get Weather");
    sketch.loadJSON('http://api.openweathermap.org/data/2.5/weather?q=NewYork,USA&units=imperial', sketch.gotWeather);
  }

  sketch.gotWeather = function(weather) {

    if (! sketch.getElement("temperature")) return;

    var dir = Number(weather.wind.deg);
    var windmag = Number(weather.wind.speed);
    var gustmag;
    if (weather.wind.gust)
      gustmag = Number(weather.wind.gust);
    else
      gustmag = windmag;
 
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

    // Popcorn timing fix
    
    if (sketch.hideWeather == true) weatherElement.hide();    

  }
 
  // Flock Class

  sketch.Flock = function () {
    this.boids = [];
  }

  sketch.Flock.prototype.addBoid = function(b) {
    this.boids.push(b);
  };  

  // Performance: Combined display, applyForce, repel and run into a single loop
  // Each comparison is now done only once per pair instead of comparing every
  // boid to every other boid every time

  sketch.Flock.prototype.display = function() {

    // Reset Loop

    this.reset();

    // Calculation Loop

    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].display(); 
      
      // Apply Force

      this.boids[i].applyForce(sketch.wind);

      // Repel
      
      if (sketch.mouseRepel) {
        sketch.mouseRepelTarget.x = sketch.mouseX / sketch.scaleFactor;
        sketch.mouseRepelTarget.y = sketch.mouseY / sketch.scaleFactor;
        //sketch.ellipse(sketch.mouseRepelTarget.x, sketch.mouseRepelTarget.y, 100,100);
        this.boids[i].repel(sketch.mouseRepelTarget);
      }

      if (sketch.staticRepel) {
        this.boids[i].repel(sketch.staticRepelTarget);
      }

      //


      //Run
      
      this.boids[i].run(this.boids, i);
    }

    // Apply Loop

    this.apply();   

  };

  sketch.Flock.prototype.reset = function() {
    for (var i = 0; i < this.boids.length; i++) {

      this.boids[i].sumSeparation.x = 0;
      this.boids[i].sumSeparation.y = 0;
      this.boids[i].countSeparation = 0;

      this.boids[i].sumAlign.x = 0;
      this.boids[i].sumAlign.y = 0;
      this.boids[i].countAlign = 0;

      this.boids[i].sumCohesion.x = 0;
      this.boids[i].sumCohesion.y = 0;
      this.boids[i].countCohesion = 0;
    }
  };

  sketch.Flock.prototype.apply = function() {
        // Apply Loop

    for (var i = 0; i < this.boids.length; i++) {

      //Arbitrarily weight these forces
      
      this.boids[i].steerSeparation.mult(2.5);
      this.boids[i].steerAlign.mult(1.0);
      this.boids[i].steerCohesion.mult(1.0);

      //Add the force vectors to acceleration
      
      this.boids[i].applyForce(this.boids[i].steerSeparation);
      this.boids[i].applyForce(this.boids[i].steerAlign);
      this.boids[i].applyForce(this.boids[i].steerCohesion);

    } 
  };  

  // Boid Class

  sketch.Boid = function(x,y) {
    this.zero = new p5.Vector(0,0);

    this.steerSeparation = new p5.Vector(0,0);
    this.steerAlign = new p5.Vector(0,0);
    this.steerCohesion = new p5.Vector(0,0);

    this.sumSeparation = new p5.Vector(0,0);
    this.sumAlign = new p5.Vector(0,0);
    this.sumCohesion =  new p5.Vector(0,0);

    this.countSeparation = 0;
    this.countAlign = 0;
    this.countCohesion = 0;

    this.acceleration = new p5.Vector(0,0);
    this.velocity = new p5.Vector(sketch.random(-1,1),sketch.random(-1,1));
    this.position = new p5.Vector(x,y);
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  sketch.Boid.prototype.run = function(boids, i) {  
    this.flock(boids, i);
    this.update();
    this.borders();
  };

  sketch.Boid.prototype.applyForce = function(force) {
    this.acceleration.add(force);
  };

  // Performance: Combined separation,align and cohesion into a loop


  sketch.Boid.prototype.flock = function(boids, boidIndex) {
    
    // Separate

    //this.sumSeparation.x = this.sumSeparation.y = 0;
    //this.countSeparation = 0;
    //var differenceSumSeparation = new p5.Vector(0,0);
    var desiredSeparationSq = 625;
    //var countSeparation = 0;

    // Align

    //this.sumAlign.x = this.sumAlign.y = 0;
    //this.countAlign = 0;
    //var velocitySumAlign = new p5.Vector(0,0);
    var neighborDistanceAlignSq = 2500;
    //var countAlign = 0;    

   // Cohesion    

    //this.sumCohesion.x = this.sumCohesion.y = 0;
    //this.countCohesion = 0;
    //var positionSumCohesion = new p5.Vector(0,0);
    var neighborDistanceCohesionSq = 2500;
    //var countCohesion = 0;

    //

    var difference = this.zero.get();

    for (var i = boidIndex + 1; i < boids.length; i++) {

      var that = boids[i];

      //var distance = p5.Vector.dist(this.position, that.position);
      difference.x = this.position.x - that.position.x;
      difference.y = this.position.y - that.position.y;
      var distSquared = (difference.x)*(difference.x) + (difference.y*difference.y);      
      // Separate

      if ((distSquared > 0) && (distSquared < desiredSeparationSq)) {

        //var difference = p5.Vector.sub(this.position,boids[i].position);


        difference.normalize();
        difference.div(distSquared);        // Weight by distance
        
        this.sumSeparation.add(difference);
        this.countSeparation++;       

        difference.mult(-1);

        that.sumSeparation.add(difference);
        that.countSeparation++; 
      }

      // Align

      if ((distSquared > 0) && (distSquared < neighborDistanceAlignSq)) {
        this.sumAlign.add(that.velocity);
        this.countAlign++;

        that.sumAlign.add(this.velocity);
        that.countAlign++;        
      }

      // Cohesion

      if ((distSquared > 0) && (distSquared < neighborDistanceCohesionSq)) {
        this.sumCohesion.add(that.position); // Add location
        this.countCohesion++;

        that.sumCohesion.add(this.position); // Add location
        that.countCohesion++;        
      }

    }

    // Separate

    this.steerSeparation = this.zero;   

    if (this.countSeparation > 0) {
      this.sumSeparation.div(this.countSeparation);
    } 

    if (this.sumSeparation.mag() > 0) {
      this.sumSeparation.normalize();
      this.sumSeparation.mult(this.maxspeed);
      this.sumSeparation.sub(this.velocity);
      this.sumSeparation.limit(this.maxforce);

      this.steerSeparation = this.sumSeparation;
    }

    // Align
    
    this.steerAlign = this.zero;

    if (this.countAlign > 0) {
      this.sumAlign.div(this.countAlign);
      this.sumAlign.normalize();
      this.sumAlign.mult(this.maxspeed);
      
      this.steerAlign = p5.Vector.sub(this.sumAlign,this.velocity);
      this.steerAlign.limit(this.maxforce);
      
    }

    // Cohesion
    
    this.steerCohesion = this.zero;

    if (this.countCohesion > 0) {
      this.sumCohesion.div(this.countCohesion);
      this.steerCohesion = this.seek(this.sumCohesion);  // Steer towards the location
    }

    //var steerSeparation = this.separate(boids);   // Separation
    //var steerAlign = this.align(boids);      // Alignment
    //var steerCohesion = this.cohesion(boids);   // Cohesion

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
    //var steer = p5.Vector.sub(desired,this.velocity);
    desired.sub(this.velocity);
    desired.limit(this.maxforce);  // Limit to maximum steering force
    return desired;
  };

  sketch.Boid.prototype.display = function() {
    //sketch.ellipse(this.position.x,this.position.y,this.r,this.r);
    sketch.image(sketch.circleCanvas,this.position.x - (sketch.radius/2),this.position.y - (sketch.radius/2));
  };

  // Wraparound
  sketch.Boid.prototype.borders = function() {

    if (this.position.x < -sketch.radius)  this.position.x = sketch.width  + sketch.radius;
    if (this.position.y < -sketch.radius)  this.position.y = sketch.height + sketch.radius;
    if (this.position.x > sketch.width + sketch.radius) this.position.x = -sketch.radius;
    if (this.position.y > sketch.height + sketch.radius) this.position.y = -sketch.radius;
  };

  sketch.Boid.prototype.repel = function(target) {

     var distance = p5.Vector.dist(target,this.position);

      if (distance < 150) { 
        var v = this.seek(target);
        v.mult(-1000/distance);
        this.applyForce(v);
      }
  }

};

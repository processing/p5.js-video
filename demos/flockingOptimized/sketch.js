var flockingSketch = function( sketch ) {

  sketch.flock;
  sketch.boids = false;
  sketch.hue = 12;
  sketch.radius = 16;

  sketch.wind = new p5.Vector();
  sketch.basewind = new p5.Vector();
  sketch.gust = new p5.Vector();  

  sketch.repelTarget = new p5.Vector(); 

  sketch.hideWeather = false;
  sketch.weatherElement = null;

  sketch.maxDistance = Math.sqrt( Math.pow(window.innerWidth,2),  Math.pow(window.innerHeight,2));

  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth,window.innerHeight);

    // Performance stamping an image is faster than ellipse

    sketch.circleCanvas = sketch.createGraphics(26,26);
    sketch.circleCanvas.strokeWeight(2);
    sketch.circleCanvas.colorMode(sketch.HSB, 100);
    sketch.circleCanvas.stroke(sketch.hue, 100,100);
    sketch.circleCanvas.fill(sketch.hue, 100,100, 80);
    sketch.circleCanvas.ellipse(13,13,24,24);

    sketch.flock = new sketch.Flock();

    //sketch.addBoids(); // Called by Popcorn
    //sketch.getWeather(); // Called by Popcorn 

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

    // Popcorn timing fix
    
    sketch.weatherElement = weatherElement;
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
      
      sketch.repelTarget.x = sketch.mouseX;
      sketch.repelTarget.y = sketch.mouseY;

      var distance = p5.Vector.dist(sketch.repelTarget,this.boids[i].position);

      if (distance < 100) { 
        var v = this.boids[i].seek(sketch.repelTarget);
        v.mult(-1000/distance);
        this.boids[i].applyForce(v);
      }

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

  // sketch.Flock.prototype.run = function() {
  //   for (var i = 0; i < this.boids.length; i++) {
  //     this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  //   }
  // };

  // sketch.Flock.prototype.applyForce = function(f) {
  //   for (var i = 0; i < this.boids.length; i++) {
  //     this.boids[i].applyForce(f);  // Passing the entire list of boids to each boid individually
  //   }
  // };

  // sketch.Flock.prototype.repel = function(x,y) {
  //   for (var i = 0; i < this.boids.length; i++) {
  //     var target = new p5.Vector(x,y);
  //     var dis = p5.Vector.dist(target,this.boids[i].position);
  //     if (dis < 100) { 
  //       var v = this.boids[i].seek(new p5.Vector(x,y));  // Passing the entire list of boids to each boid individually
  //       v.mult(-1000/dis);
  //       this.boids[i].applyForce(v);
  //     }
  //   }
  // };

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

  // // Separation
  // // Method checks for nearby boids and steers away
  // sketch.Boid.prototype.separate = function(boids) {
    
  //   // Separate

  //   var differenceSumSeparation = new p5.Vector(0,0);
  //   var desiredSeparation = 25.0;
  //   var countSeparation = 0;

  //   //

  //   for (var i = 0; i < boids.length; i++) {

  //     var distance = p5.Vector.dist(this.position,boids[i].position);
     
  //     // Separate

  //     if ((distance > 0) && (distance < desiredSeparation)) {
  //       var difference = p5.Vector.sub(this.position,boids[i].position);
  //       difference.normalize();
  //       difference.div(distance);        // Weight by distance
  //       differenceSumSeparation.add(difference);
  //       countSeparation++;            // Keep track of how many
  //     }

  //   }

  //   // Separate

  //   var steerSeparation = this.zero;

  //   if (countSeparation > 0) {
  //     differenceSumSeparation.div(countSeparation);
  //   }

  //   if (differenceSumSeparation.mag() > 0) {
  //     differenceSumSeparation.normalize();
  //     differenceSumSeparation.mult(this.maxspeed);
  //     differenceSumSeparation.sub(this.velocity);
  //     differenceSumSeparation.limit(this.maxforce);

  //     steerSeparation = differenceSumSeparation;
  //   }

  //   return steerSeparation;


  // };

  // // Alignment
  // // For every nearby boid in the system, calculate the average velocity
  // sketch.Boid.prototype.align = function(boids) {
    
  //   // Align

  //   var neighborDistanceAlign = 50;
  //   var velocitySumAlign = new p5.Vector(0,0);
  //   var countAlign = 0;
    
  //   //

  //   for (var i = 0; i < boids.length; i++) {
      
  //     var distance = p5.Vector.dist(this.position,boids[i].position);
      
  //     // Align

  //     if ((distance > 0) && (distance < neighborDistanceAlign)) {
  //       velocitySumAlign.add(boids[i].velocity);
  //       countAlign++;
  //     }

  //   }

  //   // Align
    
  //   var steerAlign = this.zero;

  //   if (countAlign > 0) {
  //     velocitySumAlign.div(countAlign);
  //     velocitySumAlign.normalize();
  //     velocitySumAlign.mult(this.maxspeed);
      
  //     steerAlign = p5.Vector.sub(velocitySumAlign,this.velocity);
  //     steerAlign.limit(this.maxforce);
      
  //   }

  //   return steerAlign;

  // };

  // // Cohesion
  // // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  // sketch.Boid.prototype.cohesion = function(boids) {

  //   // Cohesion    

  //   var neighborDistanceCohesion = 50;
  //   var positionSumCohesion = new p5.Vector(0,0);
  //   var countCohesion = 0;

  //   //
    
  //   for (var i = 0; i < boids.length; i++) {
  //     var distance = p5.Vector.dist(this.position,boids[i].position);

  //     // Cohesion      

  //     if ((distance > 0) && (distance < neighborDistanceCohesion)) {
  //       positionSumCohesion.add(boids[i].position); // Add location
  //       countCohesion++;
  //     }

  //   }

  //   // Cohesion
    
  //   var steerCohesion = this.zero;

  //   if (countCohesion > 0) {
  //     positionSumCohesion.div(countCohesion);
  //     steerCohesion = this.seek(positionSumCohesion);  // Steer towards the location
  //   }

  //   return steerCohesion;

  // };

};

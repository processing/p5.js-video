// Based on envelope example sketch

var songSketch = function( sketch ) {
  sketch.circles = null;
  
  sketch.triOsc = null;
  sketch.env = null;
  sketch.trigger = 0;

  sketch.note = 0;
  sketch.notes = [ 
    [62,600],
    [55,300],
    [57,300],
    [59,300],
    [60,300],
    [62,600],
    [55,600],
    [55,600]
  ];

  // Envelope

  sketch.attackTime = 0.1;
  sketch.attackLevel = 0.7;
  sketch.decayTime = 0.1;
  sketch.sustainTime = 0.1;
  sketch.sustainLevel = 0.2;
  sketch.releaseTime = 0.1;

  sketch.setup = function() {

    sketch.createCanvas(window.innerWidth,window.innerHeight);
    sketch.colorMode(sketch.HSB, 100);
    sketch.strokeWeight(2);

    sketch.circles = new sketch.Circles;
    sketch.trigger = sketch.millis();

    sketch.triOsc = new sketch.TriOsc();
    sketch.triOsc.amp(0);
    sketch.triOsc.start();

    sketch.env = new sketch.Env(sketch.attackTime, sketch.attackLevel, sketch.decayTime, sketch.sustainLevel, sketch.sustainTime, sketch.releaseTime);
  
  };

  sketch.draw = function() {

    sketch.clear();
    
    if ((sketch.millis() > sketch.trigger && sketch.note < sketch.notes.length)){

      var currentNote = sketch.notes[sketch.note][0];
      var currentDuration = sketch.notes[sketch.note][1];

      sketch.circles.add(Math.random() * sketch.width, Math.random() * sketch.height);

      sketch.triOsc.start(sketch.midiToFreq(currentNote));
      sketch.env.sustainTime = (currentDuration / 1000.0) - (sketch.attackTime + sketch.decayTime + sketch.releaseTime);
      sketch.env.play(sketch.triOsc);

      sketch.trigger = sketch.millis() + currentDuration;
    
      sketch.note++;
    }    

    sketch.circles.display();
  }

  sketch.Circles = function () {
    this.circles = [];
  }

  sketch.Circles.prototype.add = function(x,y) {
    this.circles.push(new sketch.Circle(x,y));
  }

  sketch.Circles.prototype.display = function() {
    for (var i = 0; i < this.circles.length; i++) {
      if (this.circles[i].age < 100) this.circles[i].display();
    }
  }

  sketch.Circle = function (x,y) {
    this.x = x;
    this.y = y
    this.hue = Math.random() * 100;
    this.age = 0;
  }

  sketch.Circle.prototype.display = function() {

    var radius = sketch.map(this.age, 0, 100, 0, 256);
    var alpha = sketch.map(this.age, 0, 100, 1.0, 0.01);

    sketch.fill(this.hue,100,100,alpha * 80);
    sketch.stroke(this.hue,100,100,alpha * 100);
    sketch.ellipse(this.x,this.y, radius,radius);

    this.age++;
  }

  return sketch;
};
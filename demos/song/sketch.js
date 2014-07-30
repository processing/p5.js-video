// Based on envelope example sketch

var songSketch = function( sketch ) {
  sketch.circles = null;
  sketch.noteContainerDiv = null;
  sketch.noteDiv = null;
  
  sketch.triOsc = null;
  sketch.env = null;
  sketch.trigger = 0;

  sketch.note = 0;
  sketch.notes = [ 
    [62,400, "D"],
    [55,200, "G"],
    [57,200, "A"],
    [59,200, "B"],
    [60,200, "C"],
    [62,400, "D"],
    [55,400, "G"],
    [55,400, "G"]
  ];

  // Envelope

  sketch.attackTime = 0.1;
  sketch.attackLevel = 0.7;
  sketch.decayTime = 03;
  sketch.sustainTime = 0.1;
  sketch.sustainLevel = 0.2;
  sketch.releaseTime = 0.5;

  sketch.setup = function() {

    //sketch.createCanvas(window.innerWidth,window.innerHeight);
    //sketch.colorMode(sketch.HSB, 100);
    //sketch.strokeWeight(2);

    //sketch.circles = new sketch.Circles;
    sketch.trigger = sketch.millis();

    sketch.triOsc = new sketch.TriOsc();
    sketch.triOsc.amp(0);
    sketch.triOsc.start();

    sketch.env = new sketch.Env(sketch.attackTime, sketch.attackLevel, sketch.decayTime, sketch.sustainLevel, sketch.sustainTime, sketch.releaseTime);
  
    sketch.noteContainerDiv = sketch.createDiv("");
    sketch.noteContainerDiv.id("noteContainer");
  };

  sketch.draw = function() {

    //sketch.clear();
    
    if ((sketch.millis() > sketch.trigger && sketch.note < sketch.notes.length)){

      var currentNote = sketch.notes[sketch.note][0];
      var currentDuration = sketch.notes[sketch.note][1];

      //sketch.circles.add(Math.random() * sketch.width, Math.random() * sketch.height);

      //sketch.noteString += " " + sketch.notes[sketch.note][2];
      //sketch.noteDiv.html(sketch.noteString);

      sketch.noteDiv = sketch.createDiv(sketch.notes[sketch.note][2]);
      sketch.noteDiv.addClass("note");
      sketch.noteDiv.parent("noteContainer");      

      sketch.triOsc.freq(sketch.midiToFreq(currentNote));
      
      sketch.env.attackTime = .1 * (currentDuration / 1000.0);
      sketch.env.decayTime = .3 * (currentDuration / 1000.0);
      sketch.env.sustainTime = .1 * (currentDuration / 1000.0);
      sketch.env.releaseTime = .5 * (currentDuration / 1000.0);

      sketch.env.play(sketch.triOsc);

      sketch.trigger = sketch.millis() + currentDuration;
    
      sketch.note++;
    }    

    //sketch.circles.display();
  }

  sketch.Circles = function () {
    this.circles = [];
  }

  sketch.Circles.prototype.add = function(x,y) {
    this.circles.push(new sketch.Circle(x,y));
  }

  sketch.Circles.prototype.display = function() {
    for (var i = 0; i < this.circles.length; i++) {
      if (this.circles[i].age < this.circles[i].maxAge) this.circles[i].display();
    }
  }

  sketch.Circle = function (x,y) {
    this.x = x;
    this.y = y
    this.hue = Math.random() * 100;
    this.birth = sketch.millis();
    this.age = 0;
    this.maxAge = 2000;
  }

  sketch.Circle.prototype.display = function() {

    if (this.age >= this.maxAge) this.age = this.maxAge;

    var radius = sketch.map(this.age, 0, this.maxAge, 0, 256);
    var alpha = sketch.map(this.age, 0, this.maxAge, 1.0, 0.01);

    sketch.fill(this.hue,100,100,alpha * 80);
    sketch.stroke(this.hue,100,100,alpha * 100);
    sketch.ellipse(this.x,this.y, radius,radius);

    this.age = sketch.millis() - this.birth;
  }

  return sketch;
};
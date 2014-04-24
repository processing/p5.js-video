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

var rectangleSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas($(window).width(), $(window).height());    
    sketch.rectangleColor = sketch.color(0, 0, 255);
  };

  sketch.draw = function() {

    if (sketch.isMousePressed()) {
        sketch.fill(0,255,0);
    } else {
        sketch.fill(sketch.rectangleColor);
    }

    sketch.rect(2, 2 ,200,100);
  }

  sketch.title = "Rectangle"
  sketch.exampleDiv ="#rectangleSketch";

  return sketch;
};

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

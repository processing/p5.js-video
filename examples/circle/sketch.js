var circleSketch = function( sketch ) {

  sketch.setup = function() {
  sketch.createCanvas(160, 160);
    sketch.colorMode(sketch.HSB, 100);
    sketch.noStroke();
    sketch.hue = 12;
  };

  sketch.draw = function() {
    sketch.clear();
 
    if (sketch.isMousePressed) {
        sketch.hue = sketch.random(100);
    }

    sketch.fill(sketch.hue, 100, 100);
    sketch.ellipse(80, 80 ,160,160);
  }

  sketch.title = "Circle"
  sketch.exampleDiv ="#circleSketch";

  return sketch;
};
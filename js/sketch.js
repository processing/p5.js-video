
var rectangleSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas(sketch.displayWidth, sketch.displayHeight);
    sketch.rectangleColor = sketch.color(0, 255, 0);
    sketch.noStroke();
  };

  sketch.draw = function() {
    if (sketch.isMousePressed()) {
        sketch.fill(255,0,0);
    } else {
        sketch.fill(sketch.rectangleColor);
    }
    sketch.rect(videoBase.x - 300, videoBase.y - 625 ,200,100);
  }

  return sketch;
};

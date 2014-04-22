var rectangleSketch = function( sketch ) {

  sketch.offset = {x:271.5, y:408};
  sketch.origin = {x:0, y:0};

  sketch.setup = function() {
    sketch.createCanvas(sketch.displayWidth, sketch.displayHeight);    
    sketch.rectangleColor = sketch.color(0, 255, 0);
    sketch.noStroke();
  };

  sketch.draw = function() {
    sketch.clear();
    
    sketch.origin.x = videoBase.x + sketch.offset.x;
    sketch.origin.y = videoBase.y - sketch.offset.y;  

    if (sketch.isMousePressed()) {
        sketch.fill(255,0,0);
    } else {
        sketch.fill(sketch.rectangleColor);
    }

    sketch.rect(sketch.origin.x, sketch.origin.y ,200,100);
  }

  sketch.exampleDiv ="#rectangleSketch";

  return sketch;
};

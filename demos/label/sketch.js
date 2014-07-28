var labelSketch = function( sketch ) {

  sketch.setup = function() {
    
    sketch.arrowCanvas =  sketch.createGraphics(128, 128);
    sketch.arrowCanvas.noFill();
    sketch.arrowCanvas.stroke(45,123,182);
    sketch.arrowCanvas.strokeWeight(4);
    sketch.arrowCanvas.arc(116, 6, 220, 220, sketch.HALF_PI,sketch.PI);

    sketch.arrowCanvas.translate(116,116);
    sketch.arrowCanvas.triangle(0,0, -8,-6, -8, 6, sketch.CLOSE );

    sketch.labelContainer = sketch.createDiv("");
    sketch.labelContainer.id("labelContainer");
    sketch.labelSpan = sketch.createSpan("Label");
    sketch.labelSpan.id("labelSpan");
    sketch.labelSpan.parent("labelContainer");
    sketch.labelContainer.hide();

    sketch.showLabel("Lauren",200,200);
  }

  sketch.showLabel = function(text,x,y) {
    sketch.labelSpan.html(text);
    sketch.labelContainer.position(x-116, y-116);
    sketch.labelContainer.show();
    sketch.arrowCanvas.position(x-116, y-116);
    sketch.arrowCanvas.show();
  }

  sketch.hideLabel = function() {
    sketch.labelContainer.hide();
    sketch.arrowCanvas.hide();
  }

};
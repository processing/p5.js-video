var outroSketch = function( sketch ) {

  sketch.setup = function() {

    sketch.labelContainer = sketch.createDiv("");
    sketch.labelContainer.id("outroContainer");
    sketch.labelContainer.hide();
  }

  sketch.showOutro = function(text,x,y) {
    sketch.labelContainer.html(text);
    sketch.labelContainer.position(x,y);
    sketch.labelContainer.show();
  }

  sketch.hideOutro = function() {
    sketch.labelContainer.hide();
  }

};
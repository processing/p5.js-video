var sliderSketch = function (sketch) {

  sketch.setup = function() {
    sketch.slider = sketch.createSlider();
    button = sketch.createButton("Kill Switch");
    button.mousePressed( function() {
      sketch.slider.remove();
      sketch.remove();
    })
  }

  return sketch;
}

var circleSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.mainCanvas = sketch.createCanvas(160, 360);
    sketch.colorMode(sketch.HSB, 100);
    sketch.strokeWeight(6);
    sketch.hue = 12;
    sketch.mode = "circle";
    
    sketch.shrinking = false;
    sketch.shinkTime = sketch.millis();
    sketch.shrinkDuration = 400;

    sketch.circleRadius = 148;
    sketch.circleStrokeWeight = 6;
    sketch.circleY = sketch.width/2;
    sketch.circleStartHue = 0;
    sketch.circleEndHue = sketch.hue;

    sketch.mainCanvas.mousePressed(
      function () {
        sketch.hue = sketch.random(100);
      });     
  };

  sketch.draw = function() {
    sketch.clear();

    if (sketch.hueSlider) {
      sketch.hue = sketch.hueSlider.value();
    }

    if (sketch.shrinking) {

        var sketchTime = sketch.millis();
        if (sketchTime > sketch.shinkTime + sketch.shrinkDuration) {
          sketchTime = sketch.shinkTime + sketch.shrinkDuration;
          sketch.shrinking = false;      
        }

        sketch.circleRadius = sketch.map(sketchTime, sketch.shinkTime, sketch.shinkTime + sketch.shrinkDuration,  140,24);
        sketch.circleStrokeWeight = sketch.map(sketchTime, sketch.shinkTime, sketch.shinkTime + sketch.shrinkDuration,  6,2);
        sketch.hue = sketch.map(sketchTime, sketch.shinkTime, sketch.shinkTime + sketch.shrinkDuration,  sketch.circleStartHue, sketch.circleEndHue);
        sketch.circleY = sketch.map(sketchTime, sketch.shinkTime, sketch.shinkTime + sketch.shrinkDuration,  sketch.width/2, 240);

    }    

    sketch.stroke(sketch.hue, 100, 100);
    sketch.fill(sketch.hue, 100, 100, 80);

    switch(sketch.mode) {
      case "circle":

        sketch.strokeWeight(sketch.circleStrokeWeight);
        sketch.ellipse(80, sketch.circleY,sketch.circleRadius,sketch.circleRadius);
        break;
      case "square":
        sketch.rect(10,10,140,140);
        break;
      case "triangle":
        var r = 74;
        var c = {
          x: 0,
          y: -r
        }
        var b = {
          x: c.x * Math.cos(Math.PI * 2/3) - ( c.y * Math.sin(Math.PI * 2/3) ),
          y: c.x * Math.sin( Math.PI * 2/3  ) + ( c.y * Math.cos( Math.PI * 2/3  ) )
        }
        var a = {
          x: c.x * Math.cos(Math.PI * 4/3) - ( c.y * Math.sin(Math.PI * 4/3) ),
          y: c.x * Math.sin( Math.PI * 4/3  ) + ( c.y * Math.cos( Math.PI * 4/3  ) )
        }        

        sketch.translate(sketch.width/2, sketch.width/2)
        sketch.triangle(a.x, a.y, b.x, b.y, c.x, c.y);
        break;
      case "flower":

        sketch.translate(sketch.width/2, sketch.width/2);

        for (var i = 0; i < 10; i ++) {
          sketch.ellipse(0, 30,20,80);
          sketch.rotate(Math.PI /5);
        }

        break;    
    }

  }

  sketch.addSlider = function() {
    console.log("Adding slider");  
    console.log(sketch.hue);

    sketch.hueSlider = sketch.createSlider(0,100);
    sketch.hueSlider.value(sketch.hue);
    sketch.hueSlider.size(160,10);
    sketch.hueSlider.position(0,180);  

  }    

  sketch.shrink = function() {
    sketch.shrinking = true;
    sketch.shinkTime = sketch.millis();
    sketch.hueSlider.hide();
    sketch.hueSlider.value(sketch.circleEndHue);

    sketch.circleStartHue = sketch.hue;
  }

  return sketch;
};
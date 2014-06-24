var circleSliderSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas(160, 160);    
    sketch.colorMode(sketch.HSB, 100);
    sketch.strokeWeight(6);
    sketch.hue = 65;

    sketch.hueSlider = sketch.createSlider(0,100,sketch.hue);
    sketch.hueSlider.size(160,10);
    sketch.hueSlider.position(0,180);    
  };

  sketch.draw = function() {
    sketch.clear();

    sketch.hue = sketch.hueSlider.value();
    sketch.fill(sketch.hue, 100, 100, 128);
    sketch.stroke(sketch.hue, 100, 100);
    sketch.ellipse(80, 80 ,148,148);
  }

  sketch.title = "Circle With Slider"
  sketch.exampleDiv ="#circleSliderSketch";

  return sketch;
};
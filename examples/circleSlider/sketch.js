var circleSliderSketch = function( sketch ) {

  sketch.setup = function() {
    sketch.createCanvas(160, 160);    
    sketch.colorMode(sketch.HSB, 100);
    sketch.noStroke();
    sketch.hue = 50;

    sketch.hueSlider = sketch.createSlider(0,100,50);
    sketch.hueSlider.size(160,10);
    sketch.hueSlider.position(0,180);    
  };

  sketch.draw = function() {
    sketch.clear();

    sketch.hue = sketch.hueSlider.value();
    sketch.fill(sketch.hue, 100, 100);
    sketch.ellipse(80, 80 ,160,160);
  }

  sketch.title = "Circle With Slider"
  sketch.exampleDiv ="#circleSliderSketch";

  return sketch;
};
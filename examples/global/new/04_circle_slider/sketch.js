// 1:13

var slider;

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  slider = sketch.createSlider(0,255,127);
  slider.position(width/4-56,height/4+128);

}

function draw() {
  clear();
  fill(slider.value());
  ellipse(width/4,height/4,128,128);
}
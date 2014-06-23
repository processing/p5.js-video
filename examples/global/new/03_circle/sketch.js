// 1:13

function setup() {
  createCanvas(displayWidth,displayHeight);
  circlecolor = color(255);
}

function draw() {
  clear();
  if (mouseIsPressed) {
    fill(0,0,255);
  } else {
    noFill();
  }
  ellipse(width/4,height/4,128,128);
}



// 1:32

function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
  if (mouseIsPressed() && mouseX > 800 && mouseX < 1000 && mouseY > 200 && mouseY < 300) {
    fill(0,0,255);
  } else {
    fill(255,0,0);
  }
  rect(800,200,200,100);
}
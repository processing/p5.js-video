function setup() {
  createGraphics(displayWidth, displayHeight);
}

function draw() {
  if (isMousePressed()) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
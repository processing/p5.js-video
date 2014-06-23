// 2:02

var rectangles = [];

var counter = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);

  for (var i = 0; i < 150; i++) {
    rectangles[i] = {
      x: random(width),
      y: random(height),
      w: random(5,100),
      h: random(5,100)
    };
  }
}

function draw() {
  clear();
  for (var i = 0; i < counter; i++) {
    var r = rectangles[i];
    fill(0,50);
    rect(r.x,r.y,r.w,r.h);
  }

  counter++;
  if (counter > rectangles.length) {
    counter = rectangles.length;
  }

}
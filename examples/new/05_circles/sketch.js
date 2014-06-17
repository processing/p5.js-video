// 1:13

var flock;

var txt;

function setup() {
  createCanvas(640,360);
  flock = new Flock();
  //txt = createP("");

  while (flock.boids.length < 100) {
    var boid = new Boid(100,100);
    flock.addBoid(boid);
  }

}

function mousePressed() {

}

function draw() {
  clear();
  stroke(0);
  fill(0,100);
  ellipse(width/4,height/4,128,128);

  flock.display();
  flock.run();

  

  //txt.html(flock.boids.length + " " + Math.floor(frameRate()));

  //console.log(frameRate());
}
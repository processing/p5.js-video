// 00:36

var shapes = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  setTimeout(function() { 
    addShapes(24,width/2,width,0,height/2,'circle'); 
  },0);
  setTimeout(function() { 
    addShapes(24,0,width/2,0,height/2,'rect'); 
  },1000);
  setTimeout(function() { 
    addShapes(24,width/2,width,height/2,height,'line');    
  },2000);
  setTimeout(function() { 
    addShapes(24,0,width/2,height/2,height,'curve');    
  },3000);
  setTimeout(function() { 
    addShapes(24,width/2-144,width/2+144,height/2-144,height/2+144,'square');
  },4000);
  setTimeout(function() { 
    addShapes(24,width/2-72,width/2+72,height/2-72,height/2+72,'triangle');
  },5000);
  setTimeout(colorize,6000);
}

function draw() {
  clear();
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].display();
    shapes[i].attract(mouseX,mouseY);
  }
}

// Trigger this from popcorn?
function addShapes(num,minx,maxx,miny,maxy,type) {
  for (var i = 0; i <num; i++) {
    shapes.push(new Shape(random(minx,maxx),random(miny,maxy),type));
  }
}

function colorize() {
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].color = color(random(255),random(255),random(255),100);
  }
}

function Shape(x,y,t) {
  this.x = x || random(width);
  this.y = y || random(height);
  this.w = random(24,72);
  this.h = this.w;
  this.color = color(0,50);
  this.type = t || 'circle';
  if (this.type === 'rect') {
    this.h -= this.h/2;
  } else if (this.type === 'line' || this.type === 'curve') {
    this.x2 = this.x + random(-72,72);
    this.y2 = this.y + random(-72,72);
    // Finalize
    if (this.type === 'curve') {
      // This is silly, need to something else
      this.x3 = (this.x*0.25 + this.x2*0.75) + random(-12,12);
      this.y3 = (this.y*0.25 + this.y2*0.75) + random(-12,12);
      this.x4 = (this.x*0.75 + this.x2*0.25) + random(-12,12);
      this.y4 = (this.y*0.75 + this.y2*0.25) + random(-12,12);
    }
  } 
}

Shape.prototype.display = function() {
  fill(this.color);
  stroke(this.color);
  rectMode(CENTER);
  ellipseMode(CENTER);
  if (this.type === 'rect' || this.type === 'square') {
    rect(this.x,this.y,this.w,this.h);
  } else if (this.type === 'circle') {
    ellipse(this.x,this.y,this.w,this.h);
  } else if (this.type === 'line') {
    line(this.x,this.y,this.x2,this.y2);
  } else if (this.type === 'curve') {
    // Not implemented yet??
    // bezier(this.x,this.y,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
    line(this.x,this.y,this.x3,this.y3);
    line(this.x3,this.y3,this.x4,this.y4);
    line(this.x4,this.y4,this.x2,this.y2);
  } else if (this.type === 'triangle') {
    beginShape();
    vertex(this.x,this.y);
    vertex(this.x-this.w/2,this.y+this.h);
    vertex(this.x+this.w/2,this.y+this.h);
    endShape(CLOSE);
  }
}

Shape.prototype.attract = function(x,y) {
  if (dist(x,y,this.x,this.y) < 200) {
    this.x = lerp(this.x,x,0.05);
    this.y = lerp(this.y,y,0.05);
    this.x += random(-5,5);
    this.y += random(-5,5);
  }

}


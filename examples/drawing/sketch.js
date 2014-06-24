var drawingSketch = function( sketch ) {

  sketch.shapes = [];

  sketch.setup = function () {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    /*
    setTimeout(function() { 
      sketch.addShapes(24,sketch.width/2,sketch.width,0,sketch.height/2,'circle'); 
    },0);
    setTimeout(function() { 
      sketch.addShapes(24,0,sketch.width/2,0,sketch.height/2,'rect'); 
    },500);
    setTimeout(function() { 
      sketch.addShapes(24,sketch.width/2,sketch.width,sketch.height/2,sketch.height,'line');    
    },1000);
    setTimeout(function() { 
      sketch.addShapes(24,0,sketch.width/2,sketch.height/2,sketch.height,'curve');    
    },1500);
    setTimeout(function() { 
      sketch.addShapes(24,sketch.width/2-144,sketch.width/2+144,sketch.height/2-144,sketch.height/2+144,'square');
    },2000);
    setTimeout(function() { 
      sketch.addShapes(24,sketch.width/2-72,sketch.width/2+72,sketch.height/2-72,sketch.height/2+72,'triangle');
    },2500);
    setTimeout(sketch.colorize,3000);
    */
  }

  sketch.draw = function() {
    sketch.clear();
    for (var i = 0; i < sketch.shapes.length; i++) {
      sketch.shapes[i].display();
      sketch.shapes[i].attract(sketch.mouseX,sketch.mouseY);
    }
  }

  sketch.addShapes = function(num,minx,maxx,miny,maxy,type) {
    for (var i = 0; i <num; i++) {
      sketch.shapes.push(new sketch.Shape(sketch.random(minx,maxx),sketch.random(miny,maxy),type));
    }
  }

  sketch.colorize = function() {
    for (var i = 0; i < sketch.shapes.length; i++) {
      sketch.shapes[i].color = sketch.color(sketch.random(255),sketch.random(255),sketch.random(255),100);
    }
  }

  sketch.Shape = function(x,y,t) {
    this.x = x || sketch.random(width);
    this.y = y || sketch.random(height);
    this.w = sketch.random(24,72);
    this.h = this.w;
    this.color = sketch.color(0,50);
    this.type = t || 'circle';
    if (this.type === 'rect') {
      this.h -= this.h/2;
    } else if (this.type === 'line' || this.type === 'curve') {
      this.x2 = this.x + sketch.random(-72,72);
      this.y2 = this.y + sketch.random(-72,72);
      // Finalize
      if (this.type === 'curve') {
        // This is silly, need to something else
        this.x3 = (this.x*0.25 + this.x2*0.75) + sketch.random(-12,12);
        this.y3 = (this.y*0.25 + this.y2*0.75) + sketch.random(-12,12);
        this.x4 = (this.x*0.75 + this.x2*0.25) + sketch.random(-12,12);
        this.y4 = (this.y*0.75 + this.y2*0.25) + sketch.random(-12,12);
      }
    } 
  }

  sketch.Shape.prototype.display = function() {
    sketch.fill(this.color);
    sketch.stroke(this.color);
    sketch.rectMode(sketch.CENTER);
    sketch.ellipseMode(sketch.CENTER);
    if (this.type === 'rect' || this.type === 'square') {
      sketch.rect(this.x,this.y,this.w,this.h);
    } else if (this.type === 'circle') {
      sketch.ellipse(this.x,this.y,this.w,this.h);
    } else if (this.type === 'line') {
      sketch.line(this.x,this.y,this.x2,this.y2);
    } else if (this.type === 'curve') {
      // Not implemented yet??
      // bezier(this.x,this.y,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
      sketch.line(this.x,this.y,this.x3,this.y3);
      sketch.line(this.x3,this.y3,this.x4,this.y4);
      sketch.line(this.x4,this.y4,this.x2,this.y2);
    } else if (this.type === 'triangle') {
      sketch.beginShape();
      sketch.vertex(this.x,this.y);
      sketch.vertex(this.x-this.w/2,this.y+this.h);
      sketch.vertex(this.x+this.w/2,this.y+this.h);
      sketch.endShape(sketch.CLOSE);
    }
  }

  sketch.Shape.prototype.attract = function(x,y) {
    if (sketch.dist(x,y,this.x,this.y) < 100) {
      this.x = sketch.lerp(this.x,x,0.05);
      this.y = sketch.lerp(this.y,y,0.05);
      this.x += sketch.random(-5,5);
      this.y += sketch.random(-5,5);
    }

  }



  return sketch;
};
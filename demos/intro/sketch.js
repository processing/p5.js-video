var introSketch = function( sketch ) {

  sketch.setup = function() {
    sketch._pixelDensity = 1;
    
    sketch.arrowCanvas =  sketch.createGraphics(80, 80);
    sketch.arrowCanvas.noFill();
    sketch.arrowCanvas.stroke(45,123,182);
    sketch.arrowCanvas.strokeWeight(4);
    sketch.arrowCanvas.arc(58, 3, 110, 110, sketch.HALF_PI,sketch.PI);

    sketch.arrowCanvas.translate(58,58);
    sketch.arrowCanvas.triangle(0,0, -8,-6, -8, 6, sketch.CLOSE );

    sketch.labelContainer = sketch.createDiv("");
    sketch.labelContainer.id("labelContainer");
    sketch.labelSpan = sketch.createSpan("Label");
    sketch.labelSpan.id("labelSpan");
    sketch.labelSpan.parent("labelContainer");
    sketch.labelContainer.hide();

    sketch.logo = sketch.createImg("/assets/p5js-rect.svg");
    sketch.logo.id('introLogo');
    sketch.logo.size(100);
    sketch.logo.hide();

    sketch.bulletList = [];
    sketch.bullets = sketch.createDiv("");
    sketch.bullets.id("bullets");
    sketch.bullets.hide();
    sketch.bulletTime = 0;

    sketch.examples = [];
    sketch.exampleDiv = sketch.createDiv("");
    sketch.exampleDiv.id("examples");
    sketch.exampleDiv.hide();


  }

  sketch.draw = function() {

    if (sketch.bulletList.length > 0) {
      if (sketch.bulletTime < sketch.millis()) {
        var newBullet = sketch.bulletList.shift();
        var newBulletDiv = sketch.createDiv('<i class="fa fa-check-circle"></i> ' + newBullet);
        newBulletDiv.parent("bullets");

        sketch.bulletTime = sketch.millis() + 200;
      }
    }

    for ( var i = 0; i < sketch.examples.length; i++) {
      var example = sketch.examples[i];
      var text = example.exampleText.substring(0,sketch.floor(example.letterIndex));
      example.exampleDiv.html(text);
      
      if (sketch.millis() > example.nextLetterTime) {
        example.letterIndex++;
        example.nextLetterTime = sketch.millis() + 40;
      }
    }

  }

  sketch.Example = function (text, div) {
    this.exampleText = text;
    this.exampleDiv = div;
    this.letterIndex = 0;
    this.nextLetterTime = 0;
  }  

  sketch.showLogo = function(x,y) {
    sketch.logo.position(x,y);
    sketch.logo.show();
  }

  sketch.hideLogo = function() {
    sketch.logo.hide();
  }

  sketch.showBullets = function(bullets, x, y) {
    sketch.bullets.position(x,y);
    sketch.bullets.show();
    sketch.bulletList = bullets;
  }

  sketch.hideBullets = function() {
    sketch.bullets.hide();
  }

  sketch.showLabel = function(text,x,y) {
    sketch.labelSpan.html(text);
    sketch.labelContainer.position(x-64, y-64);
    sketch.labelContainer.show();
    sketch.arrowCanvas.position(x-58, y-58);
    sketch.arrowCanvas.show();
  }

  sketch.hideLabel = function() {
    sketch.labelContainer.hide();
    sketch.arrowCanvas.hide();
  }

  sketch.showExample = function(text, x, y) {
    sketch.exampleDiv.show();

    var div = sketch.createDiv("");
    div.parent("examples");
    div.addClass("exampleText");
    div.position(x,y);

    sketch.examples.push(new sketch.Example(text,div));
  }

  sketch.hideExamples = function() {
    sketch.exampleDiv.hide();
  }
};
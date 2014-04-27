var script = {
  popcorn: null,
  init: function() {

    var pop = Popcorn.smart("#videoClip", "assets/video.mp4");
    pop.autoplay(false);

    pop.on( "canplayall", function(e) {

      // Setup Seriously

      var seriously, 
      chroma,
      target; 

      seriously = new Seriously();
      target = seriously.target('#videoCanvas');
      chroma = seriously.effect('chroma');

      chroma.weight = 1.25;
      chroma.balance = .0;
      chroma.screen = 'RGB(108, 216, 149)';
      chroma.clipWhite = 0.85;
      chroma.clipBlack = 0.25;

      chroma.source = "#"+script.popcorn.media.id;
      target.source = chroma;
      seriously.go();

      // Set button state
      
      $("#begin").button('reset');

    });    

    // Shapes
    
    pop.code({
      start: 20.25,
      onStart: function( options ) {
        $("#sketchCanvas").show();
        sketch = new p5(shapeSketch, "sketchCanvas");

      }
    });

    // Text
    
    pop.code({
      start: 22.9,
      onStart: function( options ) {
        $("#sketchCanvas").hide();

        sketch.noLoop();
        sketch.clear();

        sketch = new p5(textSketch, "sketchCanvas");
        script.positionSketch({left:265, top:408}, false);        

        var html = sketch.createHTML("HELLO WORLD!");
        html.id("textZero");
        html.class("textExample");
        html.position((window.innerWidth/2) - 80, window.innerHeight - 75 );
      }
    });   

    // Remove Text
    
    pop.code({
      start: 27,
      onStart: function( options ) {
        $("#textZero").remove();       
      }
    });      

    // Rectangle
    
    pop.code({
      start: 74.25,
      onStart: function( options ) {

        sketch.clear();
        $("#sketchCanvas").show();

        sketch = new p5(rectangleSketch, "sketchCanvas");
        script.positionSketch({left:265, top:408}, true);

      }
    });

    // Turn Rectangle Red

    pop.code({
      start: 77.5,
      onStart: function( options ) {
        sketch.rectangleColor = sketch.color(255, 0, 0);
      }
    });  

    // Turn Rectangle Green

    pop.code({
      start: 81,
      onStart: function( options ) {
        sketch.rectangleColor = sketch.color(0, 255, 0);
      }
    });    

    // Turn Rectangle Red

    pop.code({
      start: 82,
      onStart: function( options ) {
        sketch.rectangleColor = sketch.color(255, 0, 0);
      }
    });    

    // Show Code Callout

    pop.code({
      start: 91,
      onStart: function( options ) {
        $("#sketchTitle").text(sketch.title);
        $("#callout").show();
      }
    }); 

    // Rectangle Array

    pop.code({
      start: 111,
      onStart: function( options ) {
        sketch.noLoop();
        sketch.clear();

        sketch = new p5(rectangleArraySketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);

        $("#sketchTitle").text(sketch.title);
      }
    });   

    // Clear Example

    pop.code({
      start: 118.5,
      onStart: function( options ) {
        sketch.noLoop();  

        $("#callout").hide();
        $("#sketchCanvas").hide();
      }
    }); 

    // Text Here
    
    pop.code({
      start: 165.25,
      onStart: function( options ) {
        sketch.clear();  

        sketch = new p5(textSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);        

        var html = sketch.createHTML("Some text!");
        html.id("textOne");
        html.class("textExample");
        html.position((window.innerWidth/2) + 285, window.innerHeight - 75 );

      }
    }); 

    // Text There
    
    pop.code({
      start: 167.25,
      onStart: function( options ) {
    
        var html = sketch.createHTML("Some text!");
        html.id("textTwo");
        html.class("textExample");
        html.position((window.innerWidth/2) - 345, window.innerHeight - 75 );  
      }
    });  

    // Remove Text

    pop.code({
      start: 180,
      onStart: function( options ) {
    
        $("#textOne").remove();
        $("#textTwo").remove();   

      }
    }); 

    // Set external
    
    script.popcorn = pop;

  },

  positionSketch: function(position, relative) {

    if (relative) {

      videoBaseX = $(window).width()/2;
      videoBaseY = $(window).height(); 

      position.left = videoBaseX + position.left;
      position.top = videoBaseY - position.top;
    }

    $("#sketchCanvas").css({
      left: position.left,
      top: position.top,
    });

  }
}
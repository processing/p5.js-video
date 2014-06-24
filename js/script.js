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
      chroma.screen = 'RGB(0, 255, 19)';
      chroma.clipWhite = 1.0;
      chroma.clipBlack = 0.0;

      chroma.source = "#"+script.popcorn.media.id;
      target.source = chroma;
      seriously.go();

      // Set button state

      $("#begin").button('reset');

    });

    // Drawing Sketch

    pop.code({
      start: 33.5,
      onStart: function( options ) {

        sketch = new p5(drawingSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0} , false);

        sketch.addShapes(24,sketch.width/2,sketch.width,0,sketch.height/2,'circle'); 
 
      }
    });

    pop.code({
      start: 34,
      onStart: function( options ) {
        sketch.addShapes(24,0,sketch.width/2,0,sketch.height/2,'rect');         
      }
    });

    pop.code({
      start: 34.5,
      onStart: function( options ) {
        sketch.addShapes(24,sketch.width/2,sketch.width,sketch.height/2,sketch.height,'line');    
      }
    });

    pop.code({
      start: 35,
      onStart: function( options ) {
        sketch.addShapes(24,0,sketch.width/2,sketch.height/2,sketch.height,'curve');    
      }
    });

    pop.code({
      start: 35.5,
      onStart: function( options ) {
        sketch.addShapes(24,sketch.width/2-144,sketch.width/2+144,sketch.height/2-144,sketch.height/2+144,'square');
      }
    });

    pop.code({
      start: 36,
      onStart: function( options ) {
        sketch.addShapes(24,sketch.width/2-72,sketch.width/2+72,sketch.height/2-72,sketch.height/2+72,'triangle');
      }
    });

    pop.code({
      start: 40.05,
      onStart: function( options ) {
        sketch.colorize();
      }
    });

    pop.code({
      start: 44,
      onStart: function( options ) {

        //$("#sketchCanvas").fadeOut('slow', function() {
          sketch.remove();
          $("#sketchCanvas").show();
        //});

      }
    });


    // Elements Sketch

    pop.code({
      start: 52,
      onStart: function( options ) {

        sketch = new p5(elementsSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0} , false);

      }
    });

    pop.code({
      start: 54,
      onStart: function( options ) {
        sketch.addInput();
      }
    });

    pop.code({
      start: 54.5,
      onStart: function( options ) {
        sketch.addSlider();
      }
    });

    pop.code({
      start: 55,
      onStart: function( options ) {
        sketch.addButtons();
      }
    });            

    pop.code({
      start: 63.5,
      onStart: function( options ) {

        sketch.remove();
        $("#sketchCanvas").empty();

      }
    });    

    // Circle Sketch

    pop.code({
      start: 72 ,
      onStart: function( options ) {

        sketch = new p5(circleSketch, "sketchCanvas");
        script.positionSketch({left:-340, top:540} , true);

      }
    });

    // Turn Circle Red

    pop.code({
      start: 73.35,
      onStart: function( options ) {
        sketch.hue = 65;
      }
    });

    // Turn Rectangle Green

    pop.code({
      start: 73.95,
      onStart: function( options ) {
        sketch.hue = 50;
      }
    });

    // Show Code Callout

    pop.code({
      start: 80.5,
      onStart: function( options ) {
        $("#sketchTitle").text(sketch.title);
        $("#callout").show();
      }
    });

    // Slider Sketch

    pop.code({
      start: 96.5 ,
      onStart: function( options ) {
        sketch.remove();

        sketch = new p5(circleSliderSketch, "sketchCanvas");
        script.positionSketch({left:-340, top:540} , true);

        $("#sketchTitle").text(sketch.title);
      }
    });

    // Flocking

    pop.code({
      start: 109.7,
      onStart: function( options ) {
        
        sketch.remove();
        $("#sketchCanvas").empty();

        sketch = new p5(flockingSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);

        $("#sketchTitle").text(sketch.title);
      }
    });

    // Start Flocking

    pop.code({
      start: 113.25,
      onStart: function( options ) {
        sketch.startFlocking();
      }
    });

    // Weater

    pop.code({
      start: 129,
      onStart: function( options ) {
        sketch.getWeather();
      }
    });

    // Remove Sketch

    pop.code({
      start: 144.25,
      onStart: function( options ) {

        //$("#sketchCanvas").fadeOut('slow', function () {
          sketch.remove();
          $("#sketchCanvas").empty();
          $("#sketchCanvas").show();
        //});

        $("#callout").fadeOut('slow');
      }
    });

    // Video

    // CTA
    
    pop.code({
      start: 202.25,
      onStart: function( options ) {
        $("#cta")
          .css({top:'-96px'})
          .show()
          .animate({top:'50%'}, 
            {
              duration: 1800
            }
          );
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

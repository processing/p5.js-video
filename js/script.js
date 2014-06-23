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
        sketch.remove();
        $("#sketchCanvas").empty();
      }
    });

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

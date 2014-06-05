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

        sketch.remove();

        var html = p5DOM.createDiv("CLICK ME!");
        html.id("textZero");
        html.class("textExample");
        html.position((window.innerWidth/2) - 60, window.innerHeight - 75 );
      }
    });

    // Remove Text

    pop.code({
      start: 27,
      onStart: function( options ) {

        sketch.remove();
        $("#textZero").remove();

      }
    });

    // Rectangle

    pop.code({
      start: 74.25,
      onStart: function( options ) {

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
        sketch.remove();

        sketch = new p5(rectangleArraySketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);

        $("#sketchTitle").text(sketch.title);
      }
    });

    // Clear Example

    pop.code({
      start: 118.5,
      onStart: function( options ) {
        sketch.remove();
        $("#callout").hide();
      }
    });

    // Text Here

    pop.code({
      start: 165.25,
      onStart: function( options ) {

        var html = p5DOM.createDiv("CLICK ME!");
        html.id("textOne");
        html.class("textExample");
        html.position((window.innerWidth/2) + 285, window.innerHeight - 75 );

      }
    });

    // Text There

    pop.code({
      start: 167.25,
      onStart: function( options ) {

        var html = p5DOM.createDiv("NO, CLICK ME!");
        html.id("textTwo");
        html.class("textExample");
        html.position((window.innerWidth/2) - 345, window.innerHeight - 75 );
      }
    });

    // Remove Text

    pop.code({
      start: 180,
      onStart: function( options ) {

        sketch.remove();
        $("#textOne").remove();
        $("#textTwo").remove();

      }
    });

    // Single Particle

    pop.code({
      start: 191.35,
      onStart: function( options ) {

        sketch = new p5(particleSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);

      }
    });

    // Falling Particle

    pop.code({
      start: 195.35,
      onStart: function( options ) {
        sketch.remove();

        sketch = new p5(paticleFallSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);
      }
    });

    // Rising Particle

    pop.code({
      start: 204.35,
      onStart: function( options ) {
        sketch.remove();

        sketch = new p5(paticleRiseSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);
      }
    });

    // Multiple Particles

    pop.code({
      start: 223.75,
      onStart: function( options ) {
        sketch.remove();

        sketch = new p5(paticlesSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);
      }
    });

    // Fireworks

    pop.code({
      start: 230.75,
      onStart: function( options ) {
        sketch.remove();

        sketch = new p5(fireworkSketch, "sketchCanvas");
        script.positionSketch({left:0, top:0}, false);
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

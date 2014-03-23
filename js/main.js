var pop,
  sketch,
  videoBase = {x: 0, y: 0};

$(document).ready( function () {

  // $(document).click(function(e) {
  //   console.log(pop.currentTime());
  //   console.log(e.pageX + ", " + e.pageY );
  // });

  $(window).resize( function () {
    videoBase.x = $(document).width()/2;
    videoBase.y = $(document).height();
  });

  $("#videoClip").bind("canplaythrough", function(e) {
    seriouslyInit();
    pop.play();

   videoBase.x = $(document).width()/2;
    videoBase.y = $(document).height();    
  });

  popcornInit();   

});



function popcornInit() {

      pop = Popcorn.smart("#videoClip", "assets/video_short.mp4");
      
      pop.code({
        start: 3.3,
        onStart: function( options ) {
          sketch = new P5("sketchCanvas", rectangleSketch);
        }
      });

      pop.code({
        start:  5.25,
        onStart: function( options ) {
          sketch.rectangleColor = sketch.color(0,0,255);
        }
      });
}

function seriouslyInit() {

  var seriously, 
    chroma,
    target; 

  seriously = new Seriously();
  target = seriously.target('#videoCanvas');

  chroma = seriously.effect('chroma');

  chroma.weight = 1.32;
  chroma.balance = 0;
  chroma.screen = 'rgb(77, 239, 41)';
  chroma.clipWhite = 0.85;
  chroma.clipBlack = 0.65;

  chroma.source = "#videoClip";
  target.source = chroma;

  seriously.go();
}
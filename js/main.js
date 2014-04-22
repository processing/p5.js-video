var pop,
editor,
sketch,
videoBase = {x: 0, y: 0};

$(document).ready( function () {

  $(window).resize( function () {
    videoBase.x = $(window).width()/2;
    videoBase.y = $(window).height(); 
  });

  $("#videoClip").bind("canplaythrough", function(e) {
    $("#begin").button('reset')

    videoBase.x = $(window).width()/2;
    videoBase.y = $(window).height();    

    seriouslyInit();
  });

  popcornInit();   

  // Ace setup
  
  editor = ace.edit("exampleEditor");
  editor.getSession().setMode("ace/mode/javascript");  

  // Buttons

  $(document).click( function(e) {
    console.log( pop.currentTime());
    var clickX = e.pageX - ($(window).width()/2)
      clickY = $(window).height() - e.pageY;
    console.log( "{x:" + clickX + ", y:" + clickY + "}");
  })

  $("#callout").click( function () {
    editor.getSession().setValue($.trim($(sketch.exampleDiv).html())); 
    $("#example").fadeIn("fast");
    $("#showExample").fadeOut("fast");
    pop.pause();
  });

  $("#hideExample").click( function () {
    $("#example").fadeOut("fast");
    $("#showExample").fadeIn("fast");
    pop.play();
  });  

  $("#runExample").click( function () {
    var exampleCode = editor.getSession().getValue(); 
    $("#exampleFrame")[0].contentWindow.clear();
    $("#exampleFrame")[0].contentWindow.eval(exampleCode);
  });

  $("#begin").click( function() {
    $("#welcome").hide();
    $("#videoCanvas").fadeIn();    
    pop.play();
  });

  $("#begin").button('loading'); 

});

// Initialize Popcorn

function popcornInit() {

  pop = Popcorn.smart("#videoClip", "assets/video.mp4");
  pop.autoplay(false);

   var hash = top.location.hash.replace('#', '');

  // if (hash.length > 0) {
  //   console.log(hash);
  //   pop.currentTime(hash);
  //   pop.autoplay(true);
  // }

  pop.code({
    start: 1,
    onStart: function( options ) {
      console.log("SUP")
      sketch = new p5(rectangleSketch, "sketchCanvas");
      $("#callout").fadeIn();
    }
  });

  pop.code({
    start:  5.25,
    onStart: function( options ) {
      sketch.rectangleColor = sketch.color(0,0,255);
    }
  });
}

// Initialize Seriously

function seriouslyInit() {

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

  chroma.source = "#videoClip";
  target.source = chroma;

  seriously.go();
}
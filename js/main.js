var pop,
editor,
sketch = null,
videoBase = {x: 0, y: 0};

$(document).ready( function () {

  $(window).resize( function () {
    videoBase.x = $(window).width()/2;
    videoBase.y = $(window).height(); 

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
    editor.getSession().setValue($.trim($(sketch.exampleDiv).text())); 
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
    begin();
  });

  $("#begin").button('loading'); 

});

function begin() {
  $("#welcome").hide();
  $("#videoCanvas").fadeIn(); 

  var hash = top.location.hash.replace('#', ''), time = 0;
  if (hash.length > 0) {
    time = hash;
  }
  pop.play(time);  
}

// Initialize Popcorn

function popcornInit() {

  pop = Popcorn.smart("#videoClip", "assets/video.mp4");
  pop.autoplay(false);

  pop.on( "canplayall", function(e) {
    $("#begin").button('reset');

    videoBase.x = $(window).width()/2;
    videoBase.y = $(window).height();    
    
    seriouslyInit();

  });

  script.init();

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

  chroma.source = "#"+pop.media.id;
  target.source = chroma;
  seriously.go();
}

function positionSketch(position, relative) {

  if (relative) {
    position.left = videoBase.x + position.left;
    position.top = videoBase.y - position.top;
  }

  $("#sketchCanvas").css({
    left: position.left,
    top: position.top,
  });

}
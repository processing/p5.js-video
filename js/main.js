$(document).ready( function () {

  //sketch = new p5(flockingSketch, "sketchCanvas");
  //script.positionSketch({left:0, top:0} , false);

  // Let's go

  if (Seriously.incompatible()){
    $("#error").fadeIn();
  } else {
    main.init();
  }

});

//

var main = {
  sketch: null,

  // Initalize Demo

  init: function() {

    // Popcorn Setup

    script.init();  

    // Events

    $(document).click( function(e) {
      console.log( script.popcorn.currentTime());
      var clickX = e.pageX - ($(window).width()/2)
        clickY = $(window).height() - e.pageY;
      console.log( "{left:" + clickX + ", top:" + clickY + "}");
    });

    // Keyboad events

    $('body').keypress(function(e){
      
      var keypress = String.fromCharCode(e.which);

      // Pause

      if(keypress == "p"){

        if (script.popcorn.paused())
          script.popcorn.play();
        else
          script.popcorn.pause();
      }

      if(keypress == "."){
        if (!script.popcorn.paused()) script.popcorn.pause();
        script.popcorn.currentTime( script.popcorn.currentTime() + .25);
        console.log( script.popcorn.currentTime());
      }   

      if(keypress == ","){
        if (!script.popcorn.paused()) script.popcorn.pause();
        script.popcorn.currentTime( script.popcorn.currentTime() - .25);
        console.log( script.popcorn.currentTime());
      }          

      // Rewind

      if(keypress == "4") {
        console.log("Rewind.")
        var time = main.getStartTime();
        script.popcorn.play(time);
      }

    });    

    // Buttons

    $("#pause").click( function () {
      //editor.getSession().setValue($.trim($(sketch.exampleDiv).text())); 
      //$("#example").fadeIn("fast");
      //$("#showExample").fadeOut("fast");
        
      if (script.popcorn.paused()) {
        script.popcorn.play();
      } else {             
        script.popcorn.pause();
      }

    });

    $("#begin").click( function() {
      main.start();
    });
    $("#begin").button('loading');


    // Pause on click

    $("a")
        .attr('target', "_blank")
        .click(function () {
            script.popcorn.pause();
        });

    // Show welcome

    $("#welcome").fadeIn();

  },

  // Start Video

  start: function() {

    console.log("Starting video.");
    console.log("Length " + script.popcorn.duration() + ".");


    $("#welcome").fadeOut();
    $("#videoCanvas").fadeIn(); 
    $("#p5").fadeIn(); 
    $("#pause").fadeIn();

    var time = main.getStartTime();
    script.popcorn.play(time);  

  },

  getStartTime: function () {

    var hash = top.location.hash.replace('#', ''), time = 0;
    if (hash.length > 0) {
      time = parseFloat(hash);
      console.log("Playing from " + time + ".");
    }

    return time;

  },

  getRelativePosition: function(position) {

      videoBaseX = $(window).width()/2;
      videoBaseY = $(window).height();

      position.left = videoBaseX + position.left;
      position.top = videoBaseY - position.top;
  
      return position;

  }

}
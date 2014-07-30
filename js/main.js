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
        script.popcorn.currentTime( script.popcorn.currentTime() + (1.0/30.0));
        console.log( script.popcorn.currentTime());
      }   

      if(keypress == ","){
        if (!script.popcorn.paused()) script.popcorn.pause();
        script.popcorn.currentTime( script.popcorn.currentTime() - (1.0/30.0));
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
      if (script.popcorn.paused()) {
        script.popcorn.play();
      } else {             
        script.popcorn.pause();
      }
    });

    $("#begin").click( function() {
      main.playVideo();
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

  prepareVideo: function() {
      // Setup Seriously

      var seriously,
      chroma, fxaa,
      target;

      seriously = new Seriously();

      target = seriously.target('#videoCanvas');
      chroma = seriously.effect('chroma');
      throttle = seriously.effect('throttle');

      //chroma.weight = 1.0;
      //chroma.balance = 0;
      chroma.screen = 'rgb(100, 255, 100)';
      //chroma.clipWhite = 1.0;
      //chroma.clipBlack = 0.0;
      
      throttle.frameRate = 30;

      throttle.source = "#"+script.popcorn.media.id;
      chroma.source = throttle;
      target.source = chroma;
      seriously.go();

      // Set button state

      $("#begin").button('reset');
  },

  // Start Video

  playVideo: function() {

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
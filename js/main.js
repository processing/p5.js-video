$(document).ready( function () {

  //sketch = new p5(flockingSketch, "sketchCanvas");
  //script.positionSketch({left:0, top:0} , false);

  // Let's go

  main.init();

});

//

var main = {
  editor: null,
  sketch: null,

  // Initalize Demo

  init: function() {

    // Popcorn Setup

    script.init();  

    // Ace setup
    
    editor = ace.edit("exampleEditor");
    editor.getSession().setMode("ace/mode/javascript");  

    // Events

    $(document).click( function(e) {
      console.log( script.popcorn.currentTime());
      var clickX = e.pageX - ($(window).width()/2)
        clickY = $(window).height() - e.pageY;
      console.log( "{left:" + clickX + ", top:" + clickY + "}");
    });

    // Keyboad events

    $('body').keypress(function(e){
      
      // Pause

      if(e.which == 32){
        if (script.popcorn.paused())
          script.popcorn.play();
        else
          script.popcorn.pause();
      }

      // Rewind

      if(e.which == 114) {
        console.log("Rewind.")
        var time = main.getStartTime();
        script.popcorn.play(time);
      }

      // Mark

    });    

    // Buttons

    $("#callout").click( function () {
      editor.getSession().setValue($.trim($(sketch.exampleDiv).text())); 
      $("#example").fadeIn("fast");
      $("#showExample").fadeOut("fast");
      script.popcorn.pause();
    });

    $("#hideExample").click( function () {
      $("#example").fadeOut("fast");
      $("#showExample").fadeIn("fast");
      script.popcorn.play();
    });  

    $("#runExample").click( function () {
      var exampleCode = editor.getSession().getValue(); 
      $("#exampleFrame")[0].contentWindow.clear();
      $("#exampleFrame")[0].contentWindow.eval(exampleCode);
    });

    $("#begin").click( function() {
      main.start();
    });
    $("#begin").button('loading'); 

    // Set externals

    main.editor = editor;

  },

  // Start Video

  start: function() {

    console.log("Starting video.");
    console.log("Length " + script.popcorn.duration() + ".");


    $("#welcome").hide();
    $("#videoCanvas").fadeIn(); 

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

  }

}
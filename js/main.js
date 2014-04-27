$(document).ready( function () {

  $(window).resize( function () {

  });

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
      console.log( "{x:" + clickX + ", y:" + clickY + "}");
    })

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

    $("#welcome").hide();
    $("#videoCanvas").fadeIn(); 

    var hash = top.location.hash.replace('#', ''), time = 0;
    if (hash.length > 0) {
      time = hash;
    }
    script.popcorn.play(time);  

  }

}
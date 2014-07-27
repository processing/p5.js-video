var script = {
  popcorn: null,
  init: function() {

    var pop = Popcorn.smart("#videoClip", ["assets/video.webm","assets/video.mp4"]);
    pop.autoplay(false);

    pop.on( "canplayall", function(e) {
      script.start();
    });   

    // Lauren

    pop.code({
      start: 1,
      onStart: function( options ) {
        $("#arrow").attr("class","lauren").fadeIn();
        $("#label").text("Lauren McCarthy").attr("class","lauren").fadeIn();
      }
    }); 

    pop.code({
      start: 5,
      onStart: function( options ) {
        $("#arrow").stop().fadeOut();
        $("#label").stop().fadeOut();
      }
    }); 

    // Shiffman

    // pop.code({
    //   start: 21,
    //   onStart: function( options ) {
    //     $("#arrow").attr("class","shiffman").fadeIn();
    //     $("#label").text("Dan Shiffman").attr("class","shiffman").fadeIn();
    //   }
    // }); 

    // pop.code({
    //   start: 25,
    //   onStart: function( options ) {
    //     $("#arrow").stop().fadeOut();
    //     $("#label").stop().fadeOut();
    //   }
    // });     

    // // Drawing Sketch

    // pop.code({
    //   start: 33.5,
    //   onStart: function( options ) {

    //     sketch = new p5(drawingSketch, "sketchCanvas");
    //     script.positionSketch({left:0, top:0} , false);

    //     sketch.addShapes(24,sketch.width/2,sketch.width,0,sketch.height/2,'circle'); 
 
    //   }
    // });

    // pop.code({
    //   start: 34,
    //   onStart: function( options ) {
    //     sketch.addShapes(24,0,sketch.width/2,0,sketch.height/2,'rect');         
    //   }
    // });

    // pop.code({
    //   start: 34.5,
    //   onStart: function( options ) {
    //     sketch.addShapes(24,sketch.width/2,sketch.width,sketch.height/2,sketch.height,'line');    
    //   }
    // });

    // pop.code({
    //   start: 35,
    //   onStart: function( options ) {
    //     sketch.addShapes(24,0,sketch.width/2,sketch.height/2,sketch.height,'curve');    
    //   }
    // });

    // pop.code({
    //   start: 35.5,
    //   onStart: function( options ) {
    //     sketch.addShapes(24,sketch.width/2-144,sketch.width/2+144,sketch.height/2-144,sketch.height/2+144,'square');
    //   }
    // });

    // pop.code({
    //   start: 36,
    //   onStart: function( options ) {
    //     sketch.addShapes(24,sketch.width/2-72,sketch.width/2+72,sketch.height/2-72,sketch.height/2+72,'triangle');
    //   }
    // });

    // pop.code({
    //   start: 40.05,
    //   onStart: function( options ) {
    //     sketch.colorize();
    //   }
    // });

    // pop.code({
    //   start: 44,
    //   onStart: function( options ) {

    //     $("#sketchCanvas").fadeOut(1000);

    //   }
    // });

    // pop.code({
    //   start: 46,
    //   onStart: function( options ) {
    //       sketch.remove();
    //       $("#sketchCanvas").stop(); 
    //       $("#sketchCanvas").css({opacity:1});
    //       $("#sketchCanvas").show();        
    //   }
    // });        

    // Elements Sketch

    // pop.code({
    //   start: 52,
    //   onStart: function( options ) {

    //     sketch = new p5(elementsSketch, "sketchCanvas");
    //     script.positionSketch({left:0, top:0} , false);

    //   }
    // });

    // pop.code({
    //   start: 54,
    //   onStart: function( options ) {
    //     sketch.addInput();
    //   }
    // });

    // pop.code({
    //   start: 54.5,
    //   onStart: function( options ) {
    //     sketch.addSlider();
    //   }
    // });

    // pop.code({
    //   start: 55,
    //   onStart: function( options ) {
    //     sketch.addButtons();
    //   }
    // });            

    // pop.code({
    //   start: 63.5,
    //   onStart: function( options ) {

    //     sketch.remove();
    //     $("#sketchCanvas").empty();

    //   }
    // });    

    // Circle Sketch

    pop.code({
      start: 44 ,
      onStart: function( options ) {

        main.sketch = new p5(circleSketch, "sketchCanvas");

        var position = main.getRelativePosition({left:-340, top:540});
        $("#sketchCanvas").css({left: position.left,top: position.top,width:"auto"});

      }
    });

    pop.code({
      start: 45 ,
      onStart: function( options ) {
        main.sketch.mode = "square";
      }
    });    

    pop.code({
      start: 46 ,
      onStart: function( options ) {
        main.sketch.mode = "triangle";
      }
    });     

    pop.code({
      start: 48 ,
      onStart: function( options ) {
        main.sketch.mode = "flower";
      }
    });    

    pop.code({
      start: 52.8 ,
      onStart: function( options ) {
        main.sketch.mode = "circle";
      }
    });  

    // Turn Circle Red

    pop.code({
      start: 73.35,
      onStart: function( options ) {
        main.sketch.hue = 0;
      }
    });

    // Add Slider

    pop.code({
      start: 103,
      onStart: function( options ) {
        main.sketch.addSlider();
      }
    });    

    pop.code({
      start: 126,
      onStart: function( options ) {
        main.sketch.shrink();
      }
    });  

    pop.code({
      start: 127,
      onStart: function( options ) {

        var position = {
          x: parseFloat($("#sketchCanvas").css('left')) + 80,
          y: parseFloat($("#sketchCanvas").css('top')) + 240
        }
        main.sketch.remove();

        main.sketch = new p5(flockingSketch, "sketchCanvas");
        main.sketch.addCircle(position);
        $("#sketchCanvas").css({left: 0, top: 0, width: "100%"});   

      }
    });      

    pop.code({
      start: 130,
      onStart: function( options ) {
        main.sketch.addBoids();
      }
    });  

   pop.code({
      start: 164,
      onStart: function( options ) {
        main.sketch.getWeather();
      }
    });    

    pop.code({
      start: 187.0,
      onStart: function( options ) {   
        $("#sketchCanvas").fadeOut(1000);
      }
    });     

    pop.code({
      start: 190.0,
      onStart: function( options ) {   
        main.sketch.hideWeather();
        main.sketch.remove();

        $("#sketchCanvas").stop(); 
        $("#sketchCanvas").css({opacity:1});
        $("#sketchCanvas").show();          
      }
    });  

    // Show Pause

    /*
    pop.code({
      start: 80.5,
      onStart: function( options ) {
        $("#pause").fadeIn();
        $("#arrow").attr("class","pause").fadeIn();
        $("#label").text("Pause").attr("class","pause").fadeIn();
      }
    });

    pop.code({
      start: 87.5,
      onStart: function( options ) {
        $("#arrow").stop().fadeOut();
        $("#label").stop().fadeOut();
      }
    });  
    */  

    // Slider Sketch

    /*
    pop.code({
      start: 96.5 ,
      onStart: function( options ) {
        sketch.remove();

        sketch = new p5(circleSliderSketch, "sketchCanvas");
        script.positionSketch({left:-340, top:540} , true);

      }
    });
  */

    // Flocking

    // pop.code({
    //   start: 149.7,
    //   onStart: function( options ) {
        
    //     sketch.remove();
    //     $("#sketchCanvas").empty();

    //     sketch = new p5(flockingSketch, "sketchCanvas");
    //     script.positionSketch({left:0, top:0}, false);

    //   }
    // });

    // Start Flocking

    // pop.code({
    //   start: 143.25,
    //   onStart: function( options ) {
    //     sketch.startFlocking();
    //   }
    // });

    // Weater

    /*
    pop.code({
      start: 129,
      onStart: function( options ) {
        sketch.getWeather();
      }
    });
    */

    // Remove Sketch

    // pop.code({
    //   start: 144.25,
    //   onStart: function( options ) {
    //     $("#weather").fadeOut(1000);
    //     $("#sketchCanvas").fadeOut(1000);
    //   }
    // });

    // pop.code({
    //   start: 146.25,
    //   onStart: function( options ) {
    //       sketch.remove();
    //       $("#sketchCanvas").stop(); 
    //       $("#sketchCanvas").css({opacity:1});          
    //       $("#sketchCanvas").empty(); 
    //       $("#sketchCanvas").hide();        
    //   }
    // });     

    // Song

    pop.code({
      start: 193.20,
      onStart: function( options ) {   
        main.sketch = new p5(songSketch, "sketchCanvas");
      }
    });  

   pop.code({
      start: 198.0,
      onStart: function( options ) {     
        main.sketch.remove();
      }
    });  

    // Drawing
    
    /*
203.912818 main.js:40
{left:-161.5, top:493} main.js:43
204.466654 main.js:40
{left:-34.5, top:493} main.js:43
204.655719 main.js:40
{left:121.5, top:476} main.js:43
204.997771 main.js:40
{left:211.5, top:532} main.js:43
205.295086 main.js:40
{left:0.5, top:535} main.js:43
205.710522 main.js:40
{left:-178.5, top:535} main.js:43

     */

    pop.code({
      start: 200.0,
      onStart: function( options ) {     
        $("#sketchCanvas").addClass("foreground");
        main.sketch = new p5(paintingSketch, "sketchCanvas");
        main.sketch.disableMouse();
      }
    });   

    pop.code({
      start: 203.912818,
      onStart: function( options ) {  
        main.sketch.startDrawing();

        var position = main.getRelativePosition({left:-161.5, top:493});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -3, y: -8}
        );
      }
    }); 

    pop.code({
      start: 204.466654,
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:-34.5, top:493});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -1, y: -8}
        );
      }
    }); 
              
    pop.code({
      start: 204.655719,
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:121.5, top:476});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -3, y: -8}
        );
      }
    });
              
    pop.code({
      start: 204.997771,
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:211.5, top:532});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -2, y: -8}
        );
      }
    });

    pop.code({
      start: 205.295086,
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:0.5, top:535});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -3, y: -8}
        );
      }
    });

    pop.code({
      start: 205.710522,
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:-178.5, top:535});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -6, y: -8}
        );

        main.sketch.stopDrawing();
        main.sketch.enableMouse();
      }
    });    
    

    pop.code({
      start: 243.0,
      onStart: function( options ) {   
        $("#sketchCanvas").fadeOut(1000);
      }
    });     

    pop.code({
      start: 262.0,
      onStart: function( options ) {   
        // Get In Touch
      }
    });     

    pop.code({
      start: 245.0,
      onStart: function( options ) {   
        main.sketch.remove();

        $("#sketchCanvas").stop(); 
        $("#sketchCanvas").css({opacity:1});
        $("#sketchCanvas").show();          
      }
    });       

    // CTA
    
    pop.code({
      start: 272,
      onStart: function( options ) {
        $("#cta")
          .css({top:'-128px'})
          .show()
          .animate({top:'50%'}, 
            {
              duration: 1300
            }
          );
      }
    });

    // Set external

    script.popcorn = pop;

  },

  start: function() {
      // Setup Seriously

      var seriously,
      chroma, fxaa,
      target;

      seriously = new Seriously();
      target = seriously.target('#videoCanvas');
      chroma = seriously.effect('chroma');

      //chroma.weight = 1.0;
      //chroma.balance = 0;
      chroma.screen = 'rgb(21, 255, 10)';
      //chroma.clipWhite = 1.0;
      //chroma.clipBlack = 0.0;

      chroma.source = "#"+script.popcorn.media.id;
      target.source = chroma;
      seriously.go();

      // Set button state

      $("#begin").button('reset');
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

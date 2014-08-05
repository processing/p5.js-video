var script = {
  popcorn: null,
  init: function() {

    var pop = Popcorn.smart("#videoClip", ["assets/video.webm","assets/video.mp4"]);
    pop.autoplay(false);

    pop.on( "canplayall", function(e) {
      main.prepareVideo();
    });  

    pop.on( "play", function(e) {
        $("#pauseButton").addClass("fa-pause");
        $("#pauseButton").removeClass("fa-play"); 
    });

    pop.on( "pause", function(e) {
        $("#pauseButton").removeClass("fa-pause");
        $("#pauseButton").addClass("fa-play"); 
    });         

    /**
     * Script
     */

    // Lauren

    pop.code({
      start: 1 ,
      onStart: function( options ) {

        var position = main.getRelativePosition({left:-177.5, top:463} );
        main.sketch = new p5(introSketch, "sketchCanvas");
        main.sketch.showLabel("Lauren McCarthy", position.left, position.top);
      }
    });

    pop.code({
      start: 4.402917 ,
      onStart: function( options ) {
        main.sketch.hideLabel();
        main.sketch.showLogo(288, 272);
      }
    });     

    pop.code({
      start: 7.485301,
      onStart: function( options ) {
        main.sketch.hideLogo();
        var bullets = [
          "Beginner Friendly",
          "Video and Audio Support",
          "Expandable with Add-Ons",
          "Free to Download",
          "Open Source"
        ]

        main.sketch.showBullets(bullets, 150, 250);
      }
    }); 

    pop.code({
      start: 14.946752,
      onStart: function( options ) {
        main.sketch.hideBullets();
      }
    });  

    pop.code({
      start: 15.6,
      onStart: function( options ) {
        main.sketch.showExample("// DRAWING SHAPES", 75, 275);
      }
    });     

    pop.code({
      start: 15.9,
      onStart: function( options ) {
        main.sketch.showExample("// CREATING ELEMENTS", 75, 325);
      }
    }); 

    pop.code({
      start: 16.2,
      onStart: function( options ) {
        main.sketch.showExample("// MOUSE INTERACTION", 75, 375);
      }
    }); 

    pop.code({
      start: 16.5,
      onStart: function( options ) {
        main.sketch.showExample("// SIMPLE ANIMATIONS", 820, 275);
      }
    });    
    
    pop.code({
      start: 16.8,
      onStart: function( options ) {
        main.sketch.showExample("// FETCHING API DATA", 820, 325);
      }
    }); 

    pop.code({
      start: 17.1,
      onStart: function( options ) {
        main.sketch.showExample("// GENERATING SOUND", 820, 375);
      }
    });  

    pop.code({
      start: 22,
      onStart: function( options ) {
        main.sketch.hideExamples();

      }
    });  


    // Shiffman

    pop.code({
      start: 26  ,
      onStart: function( options ) {

        var position = main.getRelativePosition({left:-190, top:565}  );
        main.sketch.showLabel("Dan Shiffman", position.left, position.top);
      }
    });

    pop.code({
      start: 30 ,
      onStart: function( options ) {
        main.sketch.hideLabel();
      }
    }); 

    pop.code({
      start: 32 ,
      onStart: function( options ) {
        main.sketch.remove();
      }
    }); 


    // Circle Sketch

    pop.code({
      start: 44 ,
      onStart: function( options ) {

        var position = main.getRelativePosition({left:-340, top:540});
        //$("#sketchCanvas").css({left: position.left,top: position.top,width:"auto"});

        main.sketch = new p5(circleSketch, "sketchCanvas");
        main.sketch.mainCanvas.position(position.left,position.top);
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

    // Show Code

    pop.code({
      start: 57 ,
      onStart: function( options ) {        
        var position = main.getRelativePosition({left:160, top:360});
        var panel = main.sketch.showCode("ellipse(80, 80, 148, 148);", position.left, position.top );
        panel.parent('sketchOverlay');
      }
    });  

    pop.code({
      start: 67 ,
      onStart: function( options ) {        
        main.sketch.hideCode();
      }
    });  

    // Turn Circle Red

    pop.code({
      start: 73.35,
      onStart: function( options ) {
        main.sketch.hue = 100;
      }
    });    

    // Show Code

    pop.code({
      start: 77.75 ,
      onStart: function( options ) {        
        var position = main.getRelativePosition({left:160, top:360});
        var panel = main.sketch.showCode("if (isMousePressed) {<br/>&emsp;var red = random(255);<br/>&emsp;var green = random(255);<br/>&emsp;var blue = random(255);<br/>&emsp;fill(red, green, blue);<br/>}", position.left, position.top );
        panel.parent('sketchOverlay');
      }
    });  

    pop.code({
      start: 85 ,
      onStart: function( options ) {        
        main.sketch.hideCode();
      }
    });       

    // Add Slider

    pop.code({
      start: 103,
      onStart: function( options ) {
        var slider = main.sketch.addSlider();
        //slider.parent('sketchOverlay');
      }
    });       

    pop.code({
      start: 104.65615,
      onStart: function( options ) {
        var time = 104.956147 - 104.65615;
        main.sketch.animateSlider(99, 0, time);
      }
    });    

    pop.code({
      start: 104.981121,
      onStart: function( options ) {
        var time = 105.247785 - 104.981121;
        main.sketch.animateSlider(0, 99, time);
      }
    });     

    pop.code({
      start: 105.254753,
      onStart: function( options ) {
        var time = 105.454751 - 105.254753 ;
        main.sketch.animateSlider(99, 0, time);
      }
    });      

    // Show Code

    pop.code({
      start: 110.5 ,
      onStart: function( options ) {        
        var position = main.getRelativePosition({left:140, top:360});
        var panel = main.sketch.showCode("var slider = createSlider(0, 255, 127);", position.left, position.top );
        panel.parent('sketchOverlay');
      }
    });  

    pop.code({
      start: 120 ,
      onStart: function( options ) {        
        main.sketch.hideCode();
        main.sketch.hideSlider();
      }
    });         

    // Shrink 

    pop.code({
      start: 126.2,
      onStart: function( options ) {
        main.sketch.shrink();
      }
    });  

    pop.code({
      start: 127.2,
      onStart: function( options ) {

        var position = {
          x: parseFloat(main.sketch.mainCanvas.style('left')) + 80,
          y: parseFloat(main.sketch.mainCanvas.style('top')) + 240
        }
        main.sketch.remove();

        main.sketch = new p5(flockingSketch, "sketchCanvas");
        main.sketch.scaleFactor = main.scaleFactor;
        main.sketch.addCircle(position);

        var position = main.getRelativePosition({left:0, top:575}); 
        main.sketch.setRepelTarget(position.left, position.top);        

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



    // Song

    pop.code({
      start: 193.40,
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

    pop.code({
      start: 200.0,
      onStart: function( options ) {     
        $("#sketchCanvas").addClass("foreground");
        main.sketch = new p5(paintingSketch, "sketchCanvas");
        main.sketch.scaleFactor = main.scaleFactor;
        main.sketch.disableMouse();
      }
    });   

    pop.code({
      start: 203.656728, //
      onStart: function( options ) {  
        main.sketch.startDrawing();

        var position = main.getRelativePosition({left:-239, top:449});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -3, y: -8}
        );
      }
    }); 

    pop.code({
      start: 203.906728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:-56, top:585});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -1, y: -8}
        );
      }
    }); 
              
    pop.code({
      start: 204.156728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:29, top:495});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: 3, y: -8}
        );
      }
    });
              
    pop.code({
      start: 204.406728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:171, top:400});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: 5, y: -8}
        );
      }
    });

    pop.code({
      start: 204.656728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:111, top:548});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: 4, y: -8}
        );
      }
    });

    pop.code({
      start: 204.906728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:-33, top:500});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -6, y: -8}
        );
      }
    });    
    
    pop.code({
      start: 205.156728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:-167, top:423});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -6, y: -8}
        );
      }
    });  

    pop.code({
      start: 205.406728, //
      onStart: function( options ) {  
        var position = main.getRelativePosition({left:-214, top:504});   
        main.sketch.addPoint(
          {x: position.left, y: position.top},
          {x: -8, y: -8}
        );

        main.sketch.stopDrawing();
        main.sketch.enableMouse();
      }
    });       

    pop.code({
      start: 207,
      onStart: function( options ) {   
        $("#sketchCanvas").removeClass("foreground");
        main.sketch.enableMouse();
      }
    });         

    pop.code({
      start: 243.0,
      onStart: function( options ) {   
        main.sketch.disableMouse();
        main.sketch.stopDrawing();
        $("#sketchCanvas").fadeOut(1000);
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

    pop.code({
      start: 255,
      onStart: function( options ) {  
        main.sketch = new p5(outroSketch, "sketchCanvas");
      }
    });         

    pop.code({
      start: 256.37,
      onStart: function( options ) {   
        main.sketch.showOutro('<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-scissors fa-stack-1x"></i></span>', 315,248);
      }
    });      

    pop.code({
      start: 256.9,
      onStart: function( options ) {   
        main.sketch.showOutro('<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-lightbulb-o fa-stack-1x"></i></span>', 315,248);
      }
    });  

    pop.code({
      start: 257.60,
      onStart: function( options ) {   
        main.sketch.showOutro('<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-laptop fa-stack-1x"></i></span>', 315,248);
      }
    });     

    pop.code({
      start: 258.56,
      onStart: function( options ) {   
        main.sketch.showOutro('<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-pencil fa-stack-1x"></i></span>', 315,248);
      }
    });    
    
    pop.code({
      start: 259.10,
      onStart: function( options ) {   
        main.sketch.showOutro('<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-graduation-cap fa-stack-1x"></i></span>', 315,248);
      }
    });  
    
    pop.code({
      start: 259.50,
      onStart: function( options ) {   
        main.sketch.showOutro('<img class="outroImage fa-spin" src="/assets/thick-asterisk-alone.svg" alt="" />', 325, 280);
      }
    });          

    pop.code({
      start: 261.7,
      onStart: function( options ) { 
        main.sketch.showOutro('<a class="outroText" href="mailto:hello@p5js.org">hello@p5js.org</a>', 270, 300);
      
      }
    });   

    pop.code({
      start: 266.123141 ,
      onStart: function( options ) {   
        main.sketch.remove();
      }
    });            

    // CTA
    
    pop.code({
      start: 272,
      onStart: function( options ) {
        
        $("#pause").hide();

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

  }

}

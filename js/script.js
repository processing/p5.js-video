var script = {

  init: function() {

    // Rectangle
    
    pop.code({
      start: 74.25,
      onStart: function( options ) {
        sketch = new p5(rectangleSketch, "sketchCanvas");
        positionSketch({left:265, top:408}, true);

        $("#sketchCanvas").show();
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
      start: 81.25,
      onStart: function( options ) {
        sketch.rectangleColor = sketch.color(0, 255, 0);
      }
    });    

    // Turn Rectangle Red

    pop.code({
      start: 82.25,
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
        sketch.clear();
        sketch.noLoop();

        sketch = new p5(rectangleArraySketch, "sketchCanvas");
        positionSketch({left:0, top:0}, false);

        $("#sketchTitle").text(sketch.title);
      }
    });   

    // Clear Example

    pop.code({
      start: 118.5,
      onStart: function( options ) {
        sketch.noLoop();  

        $("#callout").hide();
        $("#sketchCanvas").hide();
      }
    }); 

    // Text Here
    
    pop.code({
      start: 165.25,
      onStart: function( options ) {
        sketch.clear();  

        sketch = new p5(textSketch, "sketchCanvas");
        positionSketch({left:0, top:0}, false);        

        var html = sketch.createHTML("Some text!");
        html.id("textOne");
        html.class("textExample");
        html.position(videoBase.x + 285, videoBase.y - 75);

      }
    }); 

    // Text There
    
    pop.code({
      start: 167.25,
      onStart: function( options ) {
    
        var html = sketch.createHTML("Some text!");
        html.id("textTwo");
        html.class("textExample");
        console.log(html);
        html.position(videoBase.x + -345, videoBase.y - 75);    

      }
    });  

  }
}
var elementsSketch = function( sketch ) {

  sketch.txt = [];
  sketch.h = window.innerHeight;
  sketch.w = window.innerWidth;

  sketch.choices = [ 'hello!','p5 is fun!','ding a ling a ding dong!' ];

  sketch.setup = function() {

    /*
    setTimeout(function() {
      sketch.addInput();
    },2000);

    setTimeout(function() {
      sketch.addSlider();
    },2500);

    setTimeout(function() {
      sketch.addButtons();
    },3000);
    */
  }

  sketch.draw = function() {
    if (sketch.txt.length < 60) {
      var i = sketch.floor(sketch.random(sketch.choices.length));
      var p = sketch.createP(sketch.choices[i]);
      p.position(sketch.random(sketch.w),sketch.random(sketch.h/2,sketch.h));
      sketch.txt.push(p);      
    }
  }

  sketch.addInput = function() {
     var input = sketch.createInput('Enter some text!');
     input.position(sketch.w/2,sketch.h/2-50);
     
     input.elt.oninput = function() {
      for (var i = 0; i < sketch.txt.length; i++) {
        sketch.txt[i].html(input.elt.value);
      }
     }    
  }

  sketch.addSlider = function() {
      var slider = sketch.createSlider(4,72,12);
      slider.position(sketch.w/4,sketch.h/2-50);
       
      slider.elt.oninput = function() {
        for (var i = 0; i < sketch.txt.length; i++) {
          //txt[i].size(input.elt.value);
          sketch.txt[i].style('font-size: '+input.elt.value+'pt');
        }
      }    
  }

  sketch.addButtons = function() {

      var button = sketch.createButton('red');
      button.position(sketch.w/4,sketch.h/4);  
      button.elt.onclick = function() {
        for (var i = 0; i < sketch.txt.length; i++) {
          sketch.txt[i].style('color: #FF0000');
        }
      };
      var button = sketch.createButton('green');
      button.position(sketch.w/4+50,sketch.h/4);  
      button.elt.onclick = function() {
        for (var i = 0; i < sketch.txt.length; i++) {
          sketch.txt[i].style('color: #00FF00');
        }
      };
      var button = sketch.createButton('blue');
      button.position(sketch.w/4+100,sketch.h/4);  
      button.elt.onclick = function() {
        for (var i = 0; i < sketch.txt.length; i++) {
          sketch.txt[i].style('color: #0000FF');
        }
      };

  }

  return sketch;
};
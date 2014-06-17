// 00:54

var txt = [];


function setup() {
  var w = displayWidth;
  var h = displayHeight;

  var choices = [ 'hello!','p5 is fun!','ding a ling a ding dong!' ];

  var interval = setInterval(function() {
    var i = floor(random(choices.length));
    var p = createP(choices[i]);
    p.position(random(w),random(h/2,h));
    txt.push(p);
  },10);
  
  // Trigger with popcorn?
  setTimeout(function() {
    clearInterval(interval);
  },2000);

  setTimeout(function() {
     var input = createInput('Enter some text!');
     input.position(w/2,h/2-50);
     
     input.elt.oninput = function() {
      for (var i = 0; i < txt.length; i++) {
        txt[i].html(input.value());
      }
     };
  },2000);


  setTimeout(function() {
    var slider = createSlider(4,72,12);
    slider.position(w/4,h/2-50);
     
    slider.elt.oninput = function() {
      for (var i = 0; i < txt.length; i++) {
        //txt[i].size(input.elt.value);
        txt[i].style('font-size: '+slider.value()+'pt');
      }
    };
  },2500);

  setTimeout(function() {
    var button1 = createButton('red');
    button1.position(w/4,h/4);
    button1.mousePressed(function() {
      for (var i = 0; i < txt.length; i++) {
        txt[i].style('color: #FF0000');
      }
    });
    var button2 = createButton('green');
    button2.position(w/4+50,h/4);
    button2.mousePressed(function() {
      for (var i = 0; i < txt.length; i++) {
        txt[i].style('color: #00FF00');
      }
    });
    var button3 = createButton('blue');
    button3.position(w/4+100,h/4);
    button3.mousePressed(function() {
      for (var i = 0; i < txt.length; i++) {
        txt[i].style('color: #0000FF');
      }
    });
  },3000);
}


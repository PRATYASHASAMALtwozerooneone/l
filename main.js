x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width,screen_height);
  canvas.position(0,150);
}

function preload(){
  apple = loadImage("apple.png");
}


function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
 content = event.results[0][0].transcript;
 console.log(event); 
 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    
    to_number = Number(content);
    console.log(to_number);
    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = "Started Drawing Apple"; 
      draw_apple = "set";
    }
    else{
        document.getElementById("status").innerHTML = "The speech has not recognized a number"; 
    }
}



function speak(){
synth = window.speechSynthesis;
speak_data = to_number + "Apples drawn";
utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
}

function draw() {
  if(draw_apple == "set"){
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * screen_width);
      y = Math.floor(Math.random() * 700);
      image(apple, x, y, 50, 50)
    }
    document.getElementById("status").innerHTML = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

x = 0;
y = 0;
screen_width = 0;
screen_height = 0;

draw_apple = "";
apple = "";
speak_data = "";
to_number = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    console.log(to_number);

    if (Number.isInteger(to_number))
    {
      document.getElementById("status").innerHTML = "Started Drawing Apple/s";
      draw_apple = "set";
    }
    else
    {
      document.getElementById("status").innerHTML = "Failed To Recognize Number";
    }
}

function setup() {
 screen_width = Window.innerWidth;
 screen_height = Window.innerHeight;
 canvas = createCanvas(screen_width,screen_height-150);
 canvas.position(0,140);
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "Apple/s Drawn";
    speak();
    for(i = 1; i <= to_number; i++)
    {
      x= Math.floor(Math.random*700);
      y= Math.floor(Math.random*400);
      image(apple,x,y,50,50);
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
function preLoad()
{
  apple = loadImage("apple.png");
}
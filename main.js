x = 0;
y = 0;
screenWidth = 0;
screenHeight = 0;
draw_apple = "";

apple = "";
speakData = "";
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;
  console.log(content);

  to_number = Number(content);
  console.log(to_number);
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set";
  }
  else {
    document.getElementById("status").innerHTML = "The speech has not recognized any digit(number)";
  }
}


function setup() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  canvas = createCanvas(screenWidth, screenHeight - 150);
  canvas.position(0, 150);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speakData = to_number + "Apples Drawn";
    speak();
    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
  }
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speakData);

  synth.speak(utterThis);

  speakData = "";
}

function preload() {
  apple = loadImage("apple.png");
}
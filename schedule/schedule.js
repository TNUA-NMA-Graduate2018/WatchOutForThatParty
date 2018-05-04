var socket;
var canvas;
var ellipseSize = 0;

var imgSrc = 'imgs/taipei.jpg';

var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  var x = windowWidth/2 - width/2;
  var y = 175;
  //canvas.position(x, y);
  //canvas.style('display','block');
  background(51, 0);
  bgimg = loadImage("schedule/imgs/bg.jpg");
  img0 = loadImage("schedule/imgs/00opentime.png");
  img1 = loadImage("schedule/imgs/01teacher.png");
  img2 = loadImage("schedule/imgs/02talk.png");
  img3 = loadImage("schedule/imgs/03message.png");
  img4 = loadImage("schedule/imgs/04rainbow.png");
  img5 = loadImage("schedule/imgs/05signal.png");
  img6 = loadImage("schedule/imgs/06DJTaro.png");
  img7 = loadImage("schedule/imgs/07DJKlone.png");

  socket = io.connect('10.254.19.90:3000');
  //socket = io.connect('192.168.0.7:3000');
  socket.on('schedule', newDrawing);
  console.log("schedule Connected");
  frameRate(20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newDrawing(data) {
  console.log(data);
  mode = data.s;
  background(0);
  image(bgimg,0,0,width,height);
  switch (mode) {
    case 0:
      image(img0, width/2 - 250, 175,500,150);
      break;
    case 1:
      image(img1, width/2 - 250, 175,500,150);
      break;
    case 2:
      image(img2, width/2 - 250, 175,500,150);
      break;
    case 3:
      image(img3, width/2 - 250, 175,500,150);
      break;
    case 4:
      image(img4, width/2 - 250, 175,500,150);
      break;
    case 5:
      image(img5, width/2 - 250, 175,500,150);
      break;
    case 6:
      image(img6, width/2 - 250, 175,500,150);
      break;
    case 7:
      image(img7, width/2 - 250, 175,500,150);
      break;
  }
}

function draw() {

}

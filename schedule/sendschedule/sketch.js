var socket;
var canvas;
var ellipseWidth;
var button0;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  socket = io.connect('127.0.0.1:3000');
  frameRate(60);

  button0 = createButton('00opentime');
  button0.position(150,50);
  button0.mousePressed(greetA);

  button1 = createButton('01teacher');
  button1.position(150,80);
  button1.mousePressed(greetB);

  button2 = createButton('02talk');
  button2.position(150,110);
  button2.mousePressed(greetC);

  button3 = createButton('03message');
  button3.position(150,140);
  button3.mousePressed(greetD);

  button4 = createButton('04rainbow');
  button4.position(150,170);
  button4.mousePressed(greetE);

  button5 = createButton('05signal');
  button5.position(150,200);
  button5.mousePressed(greetF);

  button6 = createButton('06DJTaro');
  button6.position(150,230);
  button6.mousePressed(greetG);

  button7 = createButton('07DJKlone');
  button7.position(150,260);
  button7.mousePressed(greetH);
}

function greetA() {
  var data = {
    s: 0
  }
  socket.emit('schedule', data);
}
function greetB() {
  var data = {
    s: 1
  }
  socket.emit('schedule', data);
}
function greetC() {
  var data = {
    s: 2
  }
  socket.emit('schedule', data);
}
function greetD() {
  var data = {
    s: 3
  }
  socket.emit('schedule', data);
}
function greetE() {
  var data = {
    s: 4
  }
  socket.emit('schedule', data);
}
function greetF() {
  var data = {
    s: 5
  }
  socket.emit('schedule', data);
}
function greetG() {
  var data = {
    s: 6
  }
  socket.emit('schedule', data);
}
function greetH() {
  var data = {
    s: 7
  }
  socket.emit('schedule', data);
}

function draw() {
  background(255);
}

var socket;
var canvas;
var ellipseSize = 0;
function setup() {
 canvas = createCanvas(windowWidth,windowHeight);
 canvas.style('z-index','-1','display','block');
 canvas.position(0,0);
 background(51);
 socket = io.connect('10.254.17.39:3000');
 socket.on('mouse',newDrawing);
 //frameRate(60);
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}
function newDrawing(data){
    ellipseSize = data.x;
}
function draw() { 
    background(ellipseSize);
    stroke(0);
    fill(0);
    
    ellipseSize -= 30;
//    if(ellipseSize<=0)ellipseSize=0;
//    ellipse(width/2,height/2,ellipseSize,ellipseSize);
}

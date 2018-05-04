var socket;
var canvas;
var ellipseSize = 0;

var isLoaded = false;
var glitch;
var imgSrc = 'per_imgs/taipei.jpg';
var msgImg;

var start = false;
var mode = 0;
var scheduleMode = 0;

var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;

var colorRed,colorGreen,colorBlue;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  canvas.style('z-index', '3');
  var x = windowWidth / 2 - width / 2;
  var y = 175;
  //canvas.position(x, y);
  //canvas.style('display','block');
  background(51, 0);
  bgimg = loadImage("schedule/imgs/bg.jpg");

  msgImg = loadImage("per_imgs/msg.jpg");

  img0 = loadImage("schedule/imgs/00opentime.png");
  img1 = loadImage("schedule/imgs/01teacher.png");
  img2 = loadImage("schedule/imgs/02talk.png");
  img3 = loadImage("schedule/imgs/03message.png");
  img4 = loadImage("schedule/imgs/04rainbow.png");
  img5 = loadImage("schedule/imgs/05signal.png");
  img6 = loadImage("schedule/imgs/06DJTaro.png");
  img7 = loadImage("schedule/imgs/07DJKlone.png");

  socket = io.connect('10.17.0.10:3000');
  socket.on('schedule', newDrawing);
  socket.on('mouse', newDrawingLTG);
  console.log("schedule Connected");
  console.log("LTG Coneected");

  frameRate(60);
  loadImage(imgSrc, function(img) {
    glitch = new Glitch(img);
  });


  background(0);
  image(bgimg, 0, 0, width, height);
  resizeCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '10');
  image(img3, width / 2 - 250, 175, 500, 150);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newDrawingLTG(data) {
  console.log("LTG");

  console.log(data);
  ellipseSize = data.x;
  if(data.x === 10){
    mode = -2;
  }
  if(data.x === 0){
    mode = -1;
  }
  else if (data.x === -3) { //reset windows
    mode = 0;
    start = false;
    isloaded = false;
    background(100, 255, 100, 0);
  } else if (data.x == -2) {
    start = true;
    isloaded = false;
    mode = 2;
  } else if (data.x === -1) {
    isLoaded = true;
    mode = 1;
  } else if(data.x === -4){
    mode = 3;
    colorRed = data.R;
    colorGreen = data.G;
    colorBlue = data.B;
  }

}

function newDrawing(data) {
  mode = 0;
  console.log("schedule");
  console.log(data);
  background(0);
  image(bgimg, 0, 0, width, height);
  resizeCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '3');
  scheduleMode = data.s;
  switch (scheduleMode) {
    case 0:
      image(img0, width / 2 - 220, 175, 366, 150);
      break;
    case 1:
      image(img1, width / 2 - 220, 175, 350, 150);
      break;
    case 2:
      image(img2, width / 2 - 220, 175, 366, 150);
      break;
    case 3:
      image(img3, width / 2 - 220, 175, 312, 176);
      break;
    case 4:
      image(img4, width / 2 - 220, 175, 632, 150);
      break;
    case 5:
      image(img5, width / 2 - 220, 175, 1161, 175);
      break;
    case 6:
      image(img6, width / 2 - 220, 175, 384, 150);
      break;
    case 7:
      image(img7, width / 2 - 220, 175, 448, 150);
      break;
  }
}

function draw() {
  if(mode === -2){
    background(0, 0);
    image(msgImg,width/2 - 175,height/2-130,175,45);
  }
  else if(mode === -1){

      background(0, 0);
      image(msgImg,random(0,width-175),random(0,height-45),175,45);
  }
  else if (mode === 0) {
    background(0, 0);
  } else if (mode === 1) {
    background(0);
    stroke(0);
    fill(0);
    if (isLoaded) {
      glitch.show();
    }
  } else if (mode === 2) {
    ellipseSize -= 30;
    background(ellipseSize);
  }
  else if(mode ===3){
    ellipseSize -= 30;
    var ellipseSizeTemp = map(ellipseSize,0,255,0,1);
    background(colorRed*ellipseSizeTemp,colorGreen*ellipseSizeTemp,colorBlue*ellipseSizeTemp);
  }
}
class Glitch {
  constructor(img) {
    this.channelLen = 4;
    this.imgOrigin = img;
    this.imgOrigin.loadPixels();
    this.copyData = [];
    this.flowLineImgs = [];
    this.shiftLineImgs = [];
    this.shiftRGBs = [];
    this.scatImgs = [];
    this.throughFlag = true;
    this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

    // flow line
    for (let i = 0; i < 1; i++) {
      let o = {
        pixels: null,
        t1: floor(random(0, 1000)),
        speed: floor(random(4, 24)),
        randX: floor(random(24, 80))
      };
      this.flowLineImgs.push(o);
    }

    // shift line
    for (let i = 0; i < 6; i++) {
      let o = null;
      this.shiftLineImgs.push(o);
    }

    // shift RGB
    for (let i = 0; i < 1; i++) {
      let o = null;
      this.shiftRGBs.push(o);
    }

    // scat imgs
    for (let i = 0; i < 3; i++) {
      let scatImg = {
        img: null,
        x: 0,
        y: 0
      };
      this.scatImgs.push(scatImg);
    }
  }

  replaceData(destImg, srcPixels) {
    for (let y = 0; y < destImg.height; y++) {
      for (let x = 0; x < destImg.width; x++) {
        let r, g, b, a;
        let index;
        index = (y * destImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        destImg.pixels[r] = srcPixels[r];
        destImg.pixels[g] = srcPixels[g];
        destImg.pixels[b] = srcPixels[b];
        destImg.pixels[a] = srcPixels[a];
      }
    }
    destImg.updatePixels();
  }

  flowLine(srcImg, obj) {

    let destPixels,
      tempY;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    obj.t1 %= srcImg.height;
    obj.t1 += obj.speed;
    //tempY = floor(noise(obj.t1) * srcImg.height);
    tempY = floor(obj.t1);
    for (let y = 0; y < srcImg.height; y++) {
      if (tempY === y) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let index;
          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          destPixels[r] = srcImg.pixels[r] + obj.randX;
          destPixels[g] = srcImg.pixels[g] + obj.randX;
          destPixels[b] = srcImg.pixels[b] + obj.randX;
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  shiftLine(srcImg) {

    let offsetX;
    let rangeMin, rangeMax;
    let destPixels;
    let rangeH;

    destPixels = new Uint8ClampedArray(srcImg.pixels);
    rangeH = srcImg.height;
    rangeMin = floor(random(0, rangeH));
    rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
    offsetX = this.channelLen * floor(random(-40, 40));

    for (let y = 0; y < srcImg.height; y++) {
      if (y > rangeMin && y < rangeMax) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let r2, g2, b2, a2;
          let index;

          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          r2 = r + offsetX;
          g2 = g + offsetX;
          b2 = b + offsetX;
          destPixels[r] = srcImg.pixels[r2];
          destPixels[g] = srcImg.pixels[g2];
          destPixels[b] = srcImg.pixels[b2];
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  shiftRGB(srcImg) {

    let randR, randG, randB;
    let destPixels;
    let range;

    range = 16;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    randR = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
    randG = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
    randB = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;

    for (let y = 0; y < srcImg.height; y++) {
      for (let x = 0; x < srcImg.width; x++) {
        let r, g, b, a;
        let r2, g2, b2, a2;
        let index;

        index = (y * srcImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        r2 = (r + randR) % srcImg.pixels.length;
        g2 = (g + randG) % srcImg.pixels.length;
        b2 = (b + randB) % srcImg.pixels.length;
        destPixels[r] = srcImg.pixels[r2];
        destPixels[g] = srcImg.pixels[g2];
        destPixels[b] = srcImg.pixels[b2];
        destPixels[a] = srcImg.pixels[a];
      }
    }

    return destPixels;
  }

  getRandomRectImg(srcImg) {
    let startX;
    let startY;
    let rectW;
    let rectH;
    let destImg;
    startX = floor(random(0, srcImg.width - 30));
    startY = floor(random(0, srcImg.height - 50));
    rectW = floor(random(30, srcImg.width - startX));
    rectH = floor(random(1, 50));
    destImg = srcImg.get(startX, startY, rectW, rectH);
    destImg.loadPixels();
    return destImg;
  }

  show() {
    // restore the original state
    this.replaceData(this.imgOrigin, this.copyData);

    // sometimes pass without effect processing
    let n = floor(random(100));
    if (n > 75 && this.throughFlag) {
      this.throughFlag = false;
      setTimeout(() => {
        this.throughFlag = true;
      }, floor(random(40, 400)));
    }
    if (!this.throughFlag) {
      push();
      translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
      image(this.imgOrigin, 0, 0);
      pop();
      return;
    }

    // flow line
    this.flowLineImgs.forEach((v, i, arr) => {
      arr[i].pixels = this.flowLine(this.imgOrigin, v);
      if (arr[i].pixels) {
        this.replaceData(this.imgOrigin, arr[i].pixels);
      }
    })

    // shift line
    this.shiftLineImgs.forEach((v, i, arr) => {
      if (floor(random(100)) > 50) {
        arr[i] = this.shiftLine(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      } else {
        if (arr[i]) {
          this.replaceData(this.imgOrigin, arr[i]);
        }
      }
    })

    // shift rgb
    this.shiftRGBs.forEach((v, i, arr) => {
      if (floor(random(100)) > 65) {
        arr[i] = this.shiftRGB(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      }
    })

    push();
    translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
    image(this.imgOrigin, 0, 0);
    pop();

    // scat image
    this.scatImgs.forEach((obj) => {
      push();
      translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
      if (floor(random(100)) > 80) {
        obj.x = floor(random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
        obj.y = floor(random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
        obj.img = this.getRandomRectImg(this.imgOrigin);
      }
      if (obj.img) {
        image(obj.img, obj.x, obj.y);
      }
      pop();
    })

  }

}
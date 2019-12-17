// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9
//< reference path="./p5.global-mode.d.ts" / >
// Global var
var sizeCube, thresholdW, thresholdH, cubeArray = [], x, y, modCounter = 0, transformCubeArray = [], modCounterTransform = 0, speed, resize, yOffset, xOffset, widthCube, heightCube;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Colors and drawing modes
  background(255);
  smooth();
  // Init Var
  resize = 0.7;
  angleMode(DEGREES);
  speed = 10;
  sizeCube = width / 10;

  var vec1 = createVector(cos(-30) * sizeCube, sin(-30) * sizeCube);
  var vec2 = createVector(cos(-150) * sizeCube, sin(-150) * sizeCube);
  var vec3 = createVector(cos(-270) * sizeCube, sin(-270) * sizeCube);


  //getWidth
  widthCube = floor(cos(30) * vec1.mag());
  //getHeigth
  vec1.add(vec2);
  heightCube = floor(abs(vec1.mag()));

  // get height to Transform
  heightTransform = (abs(vec1.mag()) + abs(vec3.mag()));
  console.log(widthCube);

  //offset init
  yOffset = (-heightCube * 0.75);
  xOffset = -((widthCube / 2) + widthCube);



  for (y = 0; y < height; y += heightCube * 0.75) {
    for (x = 0; x < width; x += widthCube) {
      if ((modCounter % 2) == 1) {

        cubeArray.push(new Cube(x, y, sizeCube, speed, 1));
      } else {

        cubeArray.push(new Cube(x - widthCube / 2, y, sizeCube, speed, 1));
      }


    }
    modCounter++;

  }


  for (y = yOffset; y < height; y += heightCube * 0.75) {
    for (x = xOffset; x < width; x += widthCube) {
      if ((modCounterTransform % 2) == 1) {

        transformCubeArray.push(new Cube(x, y - (2 * heightCube), sizeCube / 4, speed, resize));
      } else {

        transformCubeArray.push(new Cube(x - (widthCube / 2), y - (2 * heightCube), sizeCube / 4, speed, resize));
      }


    }
    modCounterTransform++;

  }

  
}

function draw() {
  //line(100,100,spacerX.x, spacerX.y);
  background(250);
  for (const cube of this.cubeArray) {
    //cube.update();
    //cube.getWidth();
    cube.show();

  }

  for (var i = 0; i < this.transformCubeArray.length; i++) {
    if (i % 2 == 0) {
      this.transformCubeArray[i].update(sin(frameCount));
    } else {this.transformCubeArray[i].update(-sin(frameCount));

    }

    this.transformCubeArray[i].show();

  }

  for (const cube of this.transformCubeArray) {
    //cube.update(sin(frameCount));


    //cube.getWidth();
    //cube.getNewPosDiagonalRight();
    //cube.getNewPosDiagonal();
    //cube.show();


  }





}


class Cube {
  constructor(x, y, length, speed, resize) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.speed = speed;
    this.resize = resize;
    this.v1 = createVector(cos(-30) * length, sin(-30) * length);
    this.v2 = createVector(cos(-150) * length, sin(-150) * length);
    this.v3 = createVector(cos(-270) * length, sin(-270) * length);



    //movementCalc
    this.moveDiagonalVecLeft = createVector(cos(150) * length, sin(150) * length);
    this.moveDiagonalVecRight = createVector(cos(30) * length, sin(30) * length);
    this.moveVerticalVec = this.v3.copy();
    this.verticalLength = this.moveVerticalVec.mag() * 4;
    this.diagonalLength = this.moveDiagonalVecLeft.mag() * 4;

    this.diagonalCounter = 0;
    this.flagDiagonal = true;
    this.verticalCounter = 0;
    this.flagVertical = true;
    // change Colorsettings
    this.colorTop = color(120);
    this.colorLeft = color(190);
    this.colorRight = color(50);
    this.origin = createVector(this.x, this.y);

  }

  addForce() {

  }

  getNewPosVertical() {
    this.moveVerticalVec.normalize();
    /*
    this.x += this.moveVerticalVec.x;
    this.y +=this.moveVerticalVec.y;
    */

    if (this.y > height + sizeCube / 4) {
      this.y -= (((heightTransform * 0.5) * 3) * 3);
    }

    this.y += this.moveVerticalVec.mag() * 4;



  }

  getNewPosDiagonalLeft() {
    this.moveDiagonalVecLeft.normalize();
    this.x += this.moveDiagonalVecLeft.x * 2;
    this.y += this.moveDiagonalVecLeft.y * 2;


  }
  getNewPosDiagonalRight() {
    if (this.x > width + sizeCube / 4) {
      this.x -= widthCube * 20;
      console.log(widthCube * 20);
    }
    //this.moveDiagonalVecRight.normalize();
    this.x += this.moveDiagonalVecRight.x * 0.1;
    this.y += this.moveDiagonalVecRight.y * 0.1;
    console.log(this.moveDiagonalVecRight.x * 0.1);
  }



  update(res) {
    this.resize = res;
    this.v1 = createVector(cos(-30) * map(this.resize, -1, 1, 0, sizeCube), sin(-30) * map(this.resize, -1, 1, 0, sizeCube));
    this.v2 = createVector(cos(-150) * map(this.resize, -1, 1, 0, sizeCube), sin(-150) * map(this.resize, -1, 1, 0, sizeCube));
    this.v3 = createVector(cos(-270) * map(this.resize, -1, 1, 0, sizeCube), sin(-270) * map(this.resize, -1, 1, 0, sizeCube));



  }
  updateBothSide() {
    if (this.diagonalCounter <= this.diagonalLength && this.flagDiagonal) {

      this.getNewPosDiagonalLeft();
      this.diagonalCounter++;

      if (this.diagonalCounter >= this.diagonalLength) {
        this.flagDiagonal = false;
        this.diagonalCounter = 0;

      }
    } else {
      if (this.verticalCounter <= this.verticalLength) {
        this.getNewPosVertical();
        this.verticalCounter++;
        if (this.verticalCounter >= this.verticalLength) {
          this.flagDiagonal = true;
          this.verticalCounter = 0;
        }
      }
    }

  }

  show() {

    push();
    translate(this.x, this.y);
    //scale(this.resize);
    noStroke();
    fill(this.colorRight);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v1.x, this.origin.y + this.v1.y);
    vertex(this.origin.x + this.v1.x + this.v3.x, this.origin.y + this.v1.y + this.v3.y);
    vertex(this.origin.x + this.v3.x, this.origin.y + this.v3.y);

    endShape(CLOSE);


    fill(this.colorTop);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v2.x, this.origin.y + this.v2.y);
    vertex(this.origin.x + this.v2.x + this.v1.x, this.origin.y + this.v2.y + this.v1.y);
    vertex(this.origin.x + this.v1.x, this.origin.y + this.v1.y);

    endShape(CLOSE);



    fill(this.colorLeft);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v3.x, this.origin.y + this.v3.y);
    vertex(this.origin.x + this.v3.x + this.v2.x, this.origin.y + this.v3.y + this.v2.y);
    vertex(this.origin.x + this.v2.x, this.origin.y + this.v2.y);

    endShape(CLOSE);
    pop();




  }


}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
  if (keyCode === 32) setup(); // 32 = Space
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}





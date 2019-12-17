// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9
//< reference path="./p5.global-mode.d.ts" / >
// Global var
var sizeCube, thresholdW, thresholdH, cubeArray = [], x, y, modCounter = 0, transformCubeArray = [], modCounterTransform = 0, speed;

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

  angleMode(DEGREES);
  speed = 0;
  sizeCube = width / 19;

  var vec1 = createVector(cos(-30) * sizeCube, sin(-30) * sizeCube);
  var vec2 = createVector(cos(-150) * sizeCube, sin(-150) * sizeCube);
  //getWidth
  var widthCube = cos(30) * vec1.mag();
  //getHeigth
  vec1.add(vec2);
  var heightCube = abs(vec1.mag());
  console.log(vec1);

  //thresholdW = width / sizeCube;
  //thresholdH = height / sizeCube;

  for (y = 0; y < height; y += heightCube * 0.75) {
    for (x = 0; x < width; x += widthCube) {
      if ((modCounter % 2) == 1) {

        cubeArray.push(new Cube(x, y, sizeCube, speed));
      } else {

        cubeArray.push(new Cube(x - widthCube / 2, y, sizeCube, speed));
      }


    }
    modCounter++;

  }

/*
  for (y = 0; y < height; y += heightCube * 0.75) {
    for (x = 0; x < width; x += widthCube) {
      if ((modCounter % 2) == 1) {

        transformCubeArray.push(new Cube(x, y, sizeCube / 4, speed));
      } else {

        transformCubeArray.push(new Cube(x - widthCube / 2, y, sizeCube / 4, speed));
      }


    }
    modCounterTransform++;

  }
*/

}

function draw() {
  //line(100,100,spacerX.x, spacerX.y);
  background(250);
  for (const cube of this.cubeArray) {
    //cube.update();
    //cube.getWidth();
    cube.show();

  }
  for (const cube of this.transformCubeArray) {
    //cube.update();
    //cube.getWidth();
    cube.show();

  }


  //let cube = new Cube(200, 200, 100, 10);


}


class Cube {
  constructor(x, y, length, speed) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.speed = speed;
    this.v1 = createVector(cos(-30) * length, sin(-30) * length);
    this.v2 = createVector(cos(-150) * length, sin(-150) * length);
    this.v3 = createVector(cos(-270) * length, sin(-270) * length);



    this.origin = createVector(this.x, this.y);

    translate(this.x, this.y, 0);

    // for Testing purpuse
    //line(0, 0, this.v1.x, this.v1.y);
    //line(0, 0, this.v2.x, this.v2.y);
    //line(0, 0, this.v3.x, this.v3.y);



    fill(50);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v1.x, this.origin.y + this.v1.y);
    vertex(this.origin.x + this.v1.x + this.v3.x, this.origin.y + this.v1.y + this.v3.y);
    vertex(this.origin.x + this.v3.x, this.origin.y + this.v3.y);
    endShape(CLOSE);


    fill(120);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v2.x, this.origin.y + this.v2.y);
    vertex(this.origin.x + this.v2.x + this.v1.x, this.origin.y + this.v2.y + this.v1.y);
    vertex(this.origin.x + this.v1.x, this.origin.y + this.v1.y);
    endShape(CLOSE);


    fill(190);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v3.x, this.origin.y + this.v3.y);
    vertex(this.origin.x + this.v3.x + this.v2.x, this.origin.y + this.v3.y + this.v2.y);
    vertex(this.origin.x + this.v2.x, this.origin.y + this.v2.y);
    endShape(CLOSE);




  }

  getWidth() {
    var vec1 = createVector(cos(-30) * this.length, sin(-30) * this.length);
    console.log(vec1);
    var widthCube = vec1.mag();
    console.log(vec1.mag());
    console.log(widthCube);

  }

  getHeight() {

  }


  addForce() {

  }

  update() {
    this.y += this.speed;
  }

  show() {

    push();
    translate(this.x, this.y);
    fill(50);
    scale(0.5);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v1.x, this.origin.y + this.v1.y);
    vertex(this.origin.x + this.v1.x + this.v3.x, this.origin.y + this.v1.y + this.v3.y);
    vertex(this.origin.x + this.v3.x, this.origin.y + this.v3.y);
    endShape(CLOSE);


    fill(120);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.origin.x + this.v2.x, this.origin.y + this.v2.y);
    vertex(this.origin.x + this.v2.x + this.v1.x, this.origin.y + this.v2.y + this.v1.y);
    vertex(this.origin.x + this.v1.x, this.origin.y + this.v1.y);
    endShape(CLOSE);


    fill(190);
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





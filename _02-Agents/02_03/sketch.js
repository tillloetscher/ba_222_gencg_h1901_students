// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9
//< reference path="./p5.global-mode.d.ts" / >
// Global var
var sizeBox, circleArray = [];

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Colors and drawing modes
  //background color (153, 204, 255)
  // ellipse Color (230, 21, 145)



  smooth();

  background(153, 204, 255);

  for (var i = 0; i < 100; i++) {
    circleArray.push(new Circle(width / 2, height / 2, random(width / 60, width / 70), cos(i), sin(i)));

  }


}

function draw() {
  background(153, 204, 255);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    circleArray[i].show();
  }


}

class Circle {
  constructor(x, y, radius, xspeed, yspeed) {
    this.mainColor = color(random(127, 255), random(127, 234), random(233, 255));
    this.strokeColor = color(random(127, 255), random(127, 234), random(233, 255));
    this.radius = radius;
    this.trailArray = [];
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;



  }

  update() {
    this.x = this.x + this.xspeed * (~~(width / 200));
    this.y = this.y + this.yspeed * (~~(width / 200));

    // Check for bouncing
    if ((this.x > width) || (this.x < 0)) {
      this.xspeed = this.xspeed * -1;

    }
    if ((this.y > height) || (this.y < 0)) {
      this.yspeed = this.yspeed * -1;
    }

    var v = createVector(this.x, this.y);
    this.trailArray.push(v);
    if (this.trailArray.length > 25) {
      this.trailArray.splice(0, 1);
    }


  }



  show() {
    // Display at x,y location
    stroke(this.strokeColor);
    fill(this.mainColor);
    ellipse(this.x, this.y, this.radius, this.radius);


    //draw trail
    for (var i = 0; i < this.trailArray.length; i++) {



      this.strokeColor.setAlpha((i * 8.4) + 1);
      this.mainColor.setAlpha((i * 8.4) + 1);


      //stroke(this.strokeColor);
      noStroke();
      fill(this.mainColor._getRed(), this.mainColor._getGreen(), this.mainColor._getBlue(), this.mainColor._getAlpha());
      ellipse(this.trailArray[i].x, this.trailArray[i].y, this.radius, this.radius);
    }
    //console.log(this.trailArray);
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

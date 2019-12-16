let snowflakes = []; // array to hold snowflake objects

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Colors and drawing modes
  background(0);
  smooth();
  // Init Var
}

function draw() {
  background('#99ccff');

  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (var i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
class snowflake {
  // initialize coordinates
  constructor(){
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, TWO_PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));
}
  update(time){
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  }

  display() {
    ellipse(this.posX, this.posY, this.size);
    noStroke();
    fill(230,21,145);
  }
}



function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}


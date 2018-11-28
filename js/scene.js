
var beginX = 20.0; // Initial x-coordinate   : random coordinate x  starting point;
var beginY = 0.0; // Initial y-coordinate
var endX = 350.0; // Final x-coordinate    : random coordinate x ending point;
var endY = innerHeight; // Final y-coordinate
var distX; // X-axis distance to move
var distY; // Y-axis distance to move
var exponent = 4; // Determines the curve  : random curve value;
var x = 0.0; // Current x-coordinate
var y = 0.0; // Current y-coordinate
var step = 0.01; // Size of each step along the path
var pct = 0.0; // Percentage traveled (0.0 to 1.0)
var a;

var bubbles = []; // array of bubble objects

function setup() {
  createCanvas(720, 500);
  noStroke();

  a = innerWidth;

  for (var i=0; i<10; i++) {
    bubbles.push(new bubble());
  }
//  getRandomLocation();

//  console.log("distX===" + distX);
//  console.log("distY===" + distY);
//  console.log("exponent===" + exponent);

}

function draw() {
  for (var i=0; i<bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  rect(a, 0, 20, a);
  a = a - 0.5;
  if (a < 0) {
    a = 50;
  }

}

function bubble() {

//  this.x = random(width);
//  this.y = random(height);
  this.diameter = random(10, 30);
  //this.speed = 1;

  this.move = function() {
    beginX = Math.random()*300 + 1;
    endX = Math.random()*700 + 300;
    exponent = floor(Math.random()*10 + 1);

    pct += step;
    distX = endX - beginX;
    distY = endY - beginY;
    if (pct < 1.0) {
      this.x = beginX + pct * distX;
      this.y = beginY + pow(pct, exponent) * distY;
    }

  };

  this.display = function() {

    fill(255,0,0);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function getRandomLocation() {
  beginX = Math.random()*300 + 1;
  endX = Math.random()*700 + 300;
  exponent = floor(Math.random()*10 + 1);

}
// function mousePressed() {
//   pct = 0.0;
//   beginX = x;
//   beginY = y;
//   endX = mouseX;
//   endY = mouseY;
//   distX = endX - beginX;
//   distY = endY - beginY;
// }

var bubbles = []; // array of bubble objects

function setup() {
  createCanvas(710, 400);
  // Create objects
  for (var i=0; i<50; i++) {
    bubbles.push(new bubble());
  }
}

function draw() {
  background(50, 89, 100);
  for (var i=0; i<bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}

// energybubble class
function bubble() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

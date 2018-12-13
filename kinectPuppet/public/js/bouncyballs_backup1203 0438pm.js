// var numBalls = 5;
// var spring = 0.05;
// var gravity = 0.1;
// var friction = -0.9;
// var balls = [];
// var canvas ;
// var context;
// function setup() {
//   //createCanvas(720, 400);
//   canvas = document.getElementById("myCanvas");
//   context = canvas.getContext("2d");
//
//   //console.log("leftHandPositonX========="+ rightHandPositonX);
//   for (var i = 0; i < numBalls; i++) {
//     balls[i] = new Ball(
//       random(canvas.width),
//       random(canvas.height/25),
//       random(5, 20),
//       i,
//       balls
//     );
//   }
// //  noStroke();
// //  fill(255, 204);
// }


//start of sabine code

function Ball(xin, yin, din, idin, oin) {
  this.x = xin;
  this.y = yin;
  var vx = 0;
  var vy = 0;
  this.diameter = din;
  this.id = idin;
  this.others = oin;

  this.collide = function(rightX,rightY) {
    //sconsole.log("rightX==="+rightX);
  //  for (var i = 0; i <= numBalls; i++) {
      // console.log(others[i]);
      var dx =  this.x-rightX;
      var dy = rightY - this.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var minDist = this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("BINGGO!2");
        var angle = Math.atan2(dy, dx);
        var targetX = this.x + Math.cos(angle) * minDist;
        var targetY = this.y + Math.sin(angle) * minDist;
        //if (this.others[i] != null)  {
        var ax = (targetX - rightX) * spring;
        var ay = (targetY - rightY) * spring;
        vx -= ax;
        vy -= ay;
      //  this.others[i].vx += ax;
      //  this.others[i].vy += ay;
        console.log("angle==="+ angle + "targetX==" + targetX + "ax==" + ax + "ay="+ay);
      } //else {
          //var ax = 1.4;
        //  var ay = 0.5;
        //  vx = ax;
      //  vy = ay;
        // angle===1.5552259176161074 targetX==267.17048181043293 ax==1.4008838190468904 ay=0.11488358163947822
        // bouncyballs.js:62 angle===1.372368361049595 targetX==267.8224808401263 ax==1.407403809343824 ay=0.11152975657955182
        // bouncyballs.js:62 angle===0.901121923762993 targetX==269.8038642905062 ax==1.4272176438476234 ay=0.08706389509442033
        // bouncyballs.js:62 angle===0.18356442755300156  targetX==269.66679039474246  ax==1.4258469048899858  ay=0.01591882359956571

      //}
      //}
    }
  };

  this.move = function() {
    vy += gravity;
    this.x += vx;
    this.y += vy;
    if (this.x + this.diameter / 2 > canvas.width) {
      this.x = canvas.width - this.diameter / 2;
      vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      vx *= friction;
    }
    if (this.y + this.diameter / 2 > canvas.height) {
      this.y = canvas.height - this.diameter / 2;
      vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      vy *= friction;
    }
  };

  this.display = function() {

   context.fillStyle = "#B22222";
   context.beginPath();
   context.arc(this.x, this.y, this.diameter, 0 , 2*Math.PI);
   context.closePath();
   context.fill();

  };
}
//end of sabine's code
//
// function draw() {
//   //background(0);
//   balls.forEach(ball => {
//     ball.collide();
//     ball.move();
//     ball.display();
//   });
// }
//
// function Ball(xin, yin, din, idin, oin) {
//   this.x = xin;
//   this.y = yin;
//   var vx = 0;
//   var vy = 0;
//   this.diameter = din;
//   this.id = idin;
//   this.others = oin;
//
//   this.collide = function() {
//     for (var i = this.id + 1; i < numBalls; i++) {
//       // console.log(others[i]);
//       var dx = this.others[i].x - this.x;
//       var dy = this.others[i].y - this.y;
//       var distance = sqrt(dx * dx + dy * dy);
//       var minDist = this.others[i].diameter / 2 + this.diameter / 2;
//       //   console.log(distance);
//       //console.log(minDist);
//       if (distance < minDist) {
//         //console.log("2");
//         var angle = atan2(dy, dx);
//         var targetX = this.x + cos(angle) * minDist;
//         var targetY = this.y + sin(angle) * minDist;
//         var ax = (targetX - this.others[i].x) * spring;
//         var ay = (targetY - this.others[i].y) * spring;
//         vx -= ax;
//         vy -= ay;
//         this.others[i].vx += ax;
//         this.others[i].vy += ay;
//       }
//     }
//   };
//
//   this.move = function() {
//     vy += gravity;
//     this.x += vx;
//     this.y += vy;
//     if (this.x + this.diameter / 2 > 500) {
//       this.x = 500 - this.diameter / 2;
//       vx *= friction;
//     } else if (this.x - this.diameter / 2 < 0) {
//       this.x = this.diameter / 2;
//       vx *= friction;
//     }
//     if (this.y + this.diameter / 2 > 500) {
//       this.y = 500 - this.diameter / 2;
//       vy *= friction;
//     } else if (this.y - this.diameter / 2 < 0) {
//       this.y = this.diameter / 2;
//       vy *= friction;
//     }
//   };
//
//   this.display = function() {
//
//   //  context.clearRect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = "#B22222";
//     context.beginPath();
//     context.arc(this.x, this.y, this.diameter, 0 , 2*Math.PI);
//   //ctx.stroke();
//     //multiplied with static integer 400 in order to adjust position on canvas
//     // as without it skeleton projection formed is only visible in a corner as DepthX values were always less than 1
//     context.closePath();
//     context.fill();
//   //  context.restore;
//
//   };
// }
//
// //
// // //var spring = 0.05;
// // var gravity = 0.1;
// // var friction = -0.9;
// // var balls = [];
// // var canvas;
// // var context;
// //
// // // function setup() {
// // // //  createCanvas(720, 400);
// // // canvas = document.getElementById("myCanvas");
// // // context = canvas.getContext("2d");
// // //
// // //  for (var i = 0; i < numBalls; i++) {
// // //    balls[i] = new Ball(
// // //      random(canvas.width),
// // //      random(20),
// // //      random(5, 20),
// // //      i,
// // //      balls
// // //    );
// // //  }
// // // //  noStroke();
// // // //  fill(255, 204);
// // // }
// //
// // function draw() {
// // // context.clearRect(0, 0, canvas.width, canvas.height);
// // //  background(0);
// // //console.log(“here”);
// //  balls.forEach(ball => {
// //    ball.collide();
// //    ball.move();
// //    ball.display();
// //  });
// // }
// //
// // function Ball(xin, yin, din, idin, oin) {
// //  this.x = xin;
// //  this.y = yin;
// //  var vx = 0;
// //  var vy = 0;
// //  this.diameter = din;
// //  this.id = idin;
// //  this.others = oin;
// //
// //  this.collide = function() {
// //    for (var i = this.id + 1; i < numBalls; i++) {
// //      // console.log(others[i]);
// //      var dx = this.others[i].x - this.x;
// //      var dy = this.others[i].y - this.y;
// //      var distance = sqrt(dx * dx + dy * dy);
// //      var minDist = this.others[i].diameter / 2 + this.diameter / 2;
// //      //   console.log(distance);
// //      //console.log(minDist);
// //      if (distance < minDist) {
// //        //console.log(“2");
// //        var angle = atan2(dy, dx);
// //        var targetX = this.x + cos(angle) * minDist;
// //        var targetY = this.y + sin(angle) * minDist;
// //        var ax = (targetX - this.others[i].x) * spring;
// //        var ay = (targetY - this.others[i].y) * spring;
// //        vx -= ax;
// //        vy -= ay;
// //        this.others[i].vx += ax;
// //        this.others[i].vy += ay;
// //      }
// //    }
// //  };
// //
// //  this.move = function() {
// //    vy += gravity;
// //    this.x += vx;
// //    this.y += vy;
// //    if (this.x + this.diameter / 2 > canvas.width) {
// //      this.x = canvas.width - this.diameter / 2;
// //      vx *= friction;
// //    } else if (this.x - this.diameter / 2 < 0) {
// //      this.x = this.diameter / 2;
// //      vx *= friction;
// //    }
// //    if (this.y + this.diameter / 2 > canvas.height) {
// //      this.y = canvas.height - this.diameter / 2;
// //      vy *= friction;
// //    } else if (this.y - this.diameter / 2 < 0) {
// //      this.y = this.diameter / 2;
// //      vy *= friction;
// //    }
// //  };
// //
// //  this.display = function() {
// //
// //    context.fillStyle = "#B22222";
// //    context.beginPath();
// //    context.arc(this.x, this.y, this.diameter, 0 , 2*Math.PI);
// //
// //  //ctx.stroke();
// //    //multiplied with static integer 400 in order to adjust position on canvas
// //    // as without it skeleton projection formed is only visible in a corner as DepthX values were always less than 1
// //   context.closePath();
// //   context.fill();
// //    //context.restore;
// //  //fill(“#B22222");
// //  //  ellipse(this.x, this.y, this.diameter);
// //    //
// //  //
// //  //   context.fillStyle = this.col;
// //  // // save current state
// //  // context.save();
// //  // // translate the origin to the x and y positions....
// //  // context.translate(this.x,this.y);
// //  //
// //  // // rotate the canvas -> but around the center of the rect
// //  // context.rotate(this.theta);
// //  // //increment theta
// //  // this.theta+=0.02;
// //  // // the coordinates are now relative to the new origin
// //  // // please note: rects draw from corner so we want to shift it
// //  // //up and left so that x,y is in its center
// //  // context.fillRect(-this.w/2,-this.h/2,this.w,this.h);
// //  // //do same for inner
// //  // context.clearRect(-this.w/2+this.innerW/2,-this.w/2+this.innerW/2,this.innerW,this.innerH);
// //  //
// //  //
// //  // //restore state
// //  // context.restore();
// //  //  ellipse(this.x, this.y, this.diameter, this.diameter);
// //  };
// // }

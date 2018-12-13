
//start

function Ball(xin, yin, din, idin, oin) {
  this.x = xin;
  this.y = yin;
  this.vx = 0;
  this.vy = 0;
  this.diameter = din;
  this.id = idin;
  this.others = oin;


  this.collideBalls = function() {
    for (var i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      var dx = this.others[i].x - this.x;
      var dy = this.others[i].y - this.y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        var angle = atan2(dy, dx);
        var targetX = this.x + cos(angle) * minDist;
        var targetY = this.y + sin(angle) * minDist;
        var ax = (targetX - this.others[i].x) * spring;
        var ay = (targetY - this.others[i].y) * spring;
        vx -= ax;
        vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  };


//S version
  this.collideHand = function(rightX,rightY) {
      //for (var i = this.id + 1; i < numBalls; i++) {
        // console.log(others[i]);
        var dx = rightX - this.x;
        var dy = rightY - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var minDist = this.diameter / 2 + 7.5;
        //   console.log(distance);
      //  console.log(distance);
        if (distance < minDist) {

          credit +=1;
            console.log("BING GO!=="+credit);

            creditFlag = 1;
          var angle = Math.atan2(dy, dx);
          var targetX = this.x + Math.cos(angle) * minDist;
          var targetY = this.y + Math.sin(angle) * minDist;
          var ax = (targetX - this.x) * spring;
          var ay = (targetY - this.y) * spring;
        /*  vx -= ax;
          vy -= ay;*/
          this.vx -= ax;
          this.vy -= ay;
        }
      //}
    };



// for multiplied bodyframes----------------

  // this.collideHands = function(hands) {
  //   //sconsole.log("rightX==="+rightX);
  //   for (var i = this.id + 1; i <= numBalls; i++) {
  //     // console.log(others[i]);
  //     for (var j = 0; j<12; j++ ) {
  //
  //     var dx = hands[j] - this.x;
  //     var dy = hands[j+1] - this.y;
  //     var distance = Math.sqrt(dx * dx + dy * dy);
  //     var minDist = this.diameter / 2;
  //     //console.log(distance);
  //     //console.log(minDist);
  //     if (distance < minDist) {
  //       //console.log("BINGGO!2");
  //       var angle = Math.atan2(dy, dx);
  //       var targetX = this.x + Math.cos(angle) * minDist;
  //       var targetY = this.y + Math.sin(angle) * minDist;
  //
  //     }
  //   } //end for loop j
  // } //end for loop i
  // };


  this.move = function() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > canvas.width) {
      this.x = canvas.width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > canvas.height) {
      // this.y = canvas.height - this.diameter / 2;
      // this.vy *= friction;

      // game over control
      gameFlag = 1;
      credit = 0;

    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;

    }
  };

  this.display = function() {

   context.fillStyle = "#B22222";
   context.beginPath();
   context.arc(this.x, this.y, this.diameter, 0 , 2*Math.PI);
   context.closePath();
   context.fill();


   context.font = "30px Arial";
   context.fillText(credit,10,50);

  };
}
//end

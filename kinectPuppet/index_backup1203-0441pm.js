var Kinect2 = require('kinect2'),
express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

    var kinect = new Kinect2();

    if(kinect.open()) {
      console.log("ready");
      server.listen(8000);
      console.log('Server listening on port 8000');
      //

    //listen for body frames
      kinect.on('bodyFrame', function(bodyFrame){
        for(var i = 0;  i < bodyFrame.bodies.length; i++) {
            if(bodyFrame.bodies[i].tracked) {
                //console.log(bodyFrame.bodies[i])
                io.sockets.emit('bodyFrame', bodyFrame.bodies[i]);
            }
          }

        });
    // Kinect is ready!


    // serving static files
    let static = require('node-static'); // for serving static files (i.e. css,js,html...)
    // serve anything from this dir ...
    app.use(express.static(__dirname + '/public'));

//console.log('Point your browser to http://www.webondevices.com');
app.get('/', function(req, res) {
  //console.log("dirname====="+__dirname);
      res.sendFile(__dirname + '/public/index.html');
 });

  // kinect.on('bodyFrame', function(bodyFrame){
     //console.log(bodyFrame);
    //   io.sockets.emit('bodyFrame', bodyFrame);

//});
   kinect.openBodyReader();

}

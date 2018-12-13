const dataDBAccess = require('./dbScripts/DBAccess.js');
let clientIdIncrementing =0;
let clientIds =[];
let db;


var Kinect2 = require('kinect2'),
express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

    var kinect = new Kinect2();
    console.log("ready");
    server.listen(4200);
    console.log('Server listening on port 4200');

    if(kinect.open()) {
      // console.log("ready");
      // server.listen(4200);
      // console.log('Server listening on port 4200');
      //

    //listen for body frames
      kinect.on('bodyFrame', function(bodyFrame){
        for(var i = 0;  i < bodyFrame.bodies.length; i++) {
            if(bodyFrame.bodies[i].tracked) {
                //console.log(bodyFrame.bodies[i])
                let data  ={
                  "userId":'bodyFrame'+i,
                  "bodyFrame": bodyFrame.bodies[i]

                }
                io.sockets.emit('bodyFrame', data);
            //    console.log("bodyframeindex====="+i);
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

 // app.get('/toplist', function(req, res) {
 //   //console.log("dirname====="+__dirname);
 //       res.sendFile(__dirname + '/public/toplist.html');
 //  });



  // kinect.on('bodyFrame', function(bodyFrame){
     //console.log(bodyFrame);
    //   io.sockets.emit('bodyFrame', bodyFrame);

//});
   kinect.openBodyReader();

}


//make a route to display page...
app.get('/displayPage', function(req, res) {
    res.sendFile(__dirname + '/public/display.html');
});
//make a route to insert page...
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/toplist', function(req, res) {
  //console.log("dirname====="+__dirname);
      res.sendFile(__dirname + '/public/toplist.html');
 });

io.on('connection', function(socket){
  let db = dataDBAccess.establishConnection();
  socket.on('join', function (data) {
    // open connection to db

  clientIdIncrementing++;
 // send back the id
 socket.emit('joinedClientId', clientIdIncrementing);
 console.log('a new user with id ' + clientIdIncrementing + " has entered");
 //keep track of the ids
 clientIds.push({id:clientIdIncrementing,socketId:socket.id});
});
socket.on('insertData', function (dataIn){
  let parsedData = JSON.parse(dataIn);
  dataDBAccess.putData(db,parsedData).then(result => {
      //do something with the result
     console.log("here:: "+result);
  })
  .catch(function(rej) {
      //here when you reject the promise
      console.log(rej);
    });
  });


    socket.on('retrieveData', function (pars){
      let parsedPars = JSON.parse(pars);
      console.log(parsedPars);
      dataDBAccess.fetchData(db,parsedPars).then(result => {
          //do something with the result
         console.log("here:: "+result);
         socket.emit("dataIsRetrieved",result);
      })
      .catch(function(rej) {
          //here when you reject the promise
          console.log(rej);
        });
});

});

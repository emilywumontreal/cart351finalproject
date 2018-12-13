$(document).ready (function(){
console.log("we can do some client side scripting ... ");
//set up the client socket to connect to the socket.io server
let clientSocket = io.connect('http://localhost:4200');
let socketId =-1;

  clientSocket.on('connect', function(data) {
      console.log("connected");
      // put code here that should only execute once the client is connected
      clientSocket.emit('join', 'msg:: client joined');
      // handler for receiving client id
      clientSocket.on("joinedClientId", function(data){
        socketId = data;
        console.log("myId "+socketId);
        /*** MAKE SURE WE ARE ALWAYS WITHIN THIS CALLBACK ***/
        clientSocket.on("retrieveFromDB", function(incomingData){

        });


        /*WHEN WE WANT TO INSERT INTO DB **/
          $("#insertGallery").submit(function(event) {
             //stop submit the form, we will post it manually.
             //PREVENT THE DEFAULT behaviour ...
          event.preventDefault();
          console.log("button clicked");
          let form = $('#insertGallery')[0];
        //prepare data to be a json obj
          let sArr = $( form ).serializeArray();
          let dataToInsert ={};
          //build the data
          sArr.forEach(function(element) {
          dataToInsert[`${element.name}`] = element.value;

          });
          console.log(dataToInsert);
          //now send via socket io to server ...
          clientSocket.emit('insertData', JSON.stringify(dataToInsert));

      });//join
  });//connect
}); //button

/** WHEN WE WANT TO RETRIEVE FROM DB ***/
$("#retrieveFromGallery").submit(function(event) {
   //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
event.preventDefault();
 console.log("button clicked");
 let form = $('#retrieveFromGallery')[0];
 let sArr = $( form ).serializeArray();
//prepare data to be a json obj
 let parsToRetrive ={};
 sArr.forEach(function(element) {
 parsToRetrive[`${element.name}`] = element.value;
});
//now send via socket io to server ...
clientSocket.emit('retrieveData', JSON.stringify(parsToRetrive));
});

/** WE HAVE RECEIVED A MESSAGE FROM SERVER WITH DATA ***/
clientSocket.on("dataIsRetrieved",function(theResult){
displayResponse(theResult)

});

// DISPLAY THE RESPONSE...
function displayResponse(theResult){
  $("#result").empty();
  // theResult is AN ARRAY of objects ...
  for(let i=0; i< theResult.length; i++)
  {
  // get the next object
  let currentObject = theResult[i];
  let container = $('<div>').addClass("outer");
  let contentContainer = $('<div>').addClass("content");
  // go through each property in the current object ....
  for (let property in currentObject) {
      let para = $('<p>');
      $(para).text(property+"::" +currentObject[property]);
      $(para).appendTo(contentContainer);
    }
  $(contentContainer).appendTo(container);
  $(container).appendTo("#result");
 }
}




});//document.ready

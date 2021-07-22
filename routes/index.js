var express = require('express');
var router = express.Router();

var theServer = require('../app');
var io = theServer.getIO(); //your io var

const mongodbModel = require("../models/mongodb.js");

router.get("/", (req,res, next) => {
  res.render('pages/index.ejs' ,{"pagename":"Home"});
});

io.on('connection', function(socket) {
   connectCounter++;
   console.log('\x1b[31m','SITE > A USER CONNECTED [COUNT='+connectCounter+']');
   
   setInterval(function(){

     var modelobject = mongodbModel.getsensordata()

     modelobject.exec(function (err, data) {
      if (err) return handleError(err);
      socket.emit('message',  { data : data , connectCounter: connectCounter })
    })
     
    }, 1000);

  //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('\x1b[31m','SITE > A USER DISCONNECTED [COUNT='+connectCounter+']');
      connectCounter--; 
   });
}); 

module.exports = router;
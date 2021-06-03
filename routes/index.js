var express = require('express');
var router = express.Router();

var theServer = require('../app');
var io = theServer.getIO(); //your io var

const mongodbModel = require("../models/sensormongodb");

router.get("/", (req,res, next) => {
  res.render('pages/index.ejs' ,{"pagename":"Home"});
});

io.on('connection', function(socket) {
   connectCounter++;
   console.log('A user connected');
   
   setInterval(function(){

     var modelobject = mongodbModel.getDBdata()

     modelobject.exec(function (err, data) {
      if (err) return handleError(err);
      socket.emit('message',  { data : data , connectCounter: connectCounter })
    })
     
    }, 1000);

  //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
      connectCounter--; 
   });
}); 

module.exports = router;
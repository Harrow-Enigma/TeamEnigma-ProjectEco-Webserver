const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use('/', require('./routes/index.js'));
app.use('/about', require('./routes/about.js'));
app.use('/resources', require('./routes/resources.js'));
app.use('/export', require('./routes/download.js'));

app.use('/api/rest/ai/v1', require('./routes/outputapi.js'));
app.use('/api/rest/sensors/v1', require('./routes/inputapi.js'));

app.use('/static', express.static(path.join(__dirname, 'views/static')))

// catch 404
app.use(function(req, res, next) {
  res.send("error")
});

const mongodbModel = require("./models/sensormongodb");

connectCounter = 0;
//Whenever someone connects this gets executed
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


//io.emit('message', {data : "data"})


module.exports = app;

http.listen(3093, () => {
  console.log("Server started on port 3001")
});
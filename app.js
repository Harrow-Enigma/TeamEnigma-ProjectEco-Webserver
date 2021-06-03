const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports.getIO = function(){
     return io;
}

const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use('/', require('./routes/index.js'));

app.use('/about', require('./routes/about.js'));
app.use('/resources', require('./routes/resources.js'));
app.use('/export', require('./routes/download.js'));

app.use('/api/v1', require('./routes/apiv1.js'));

app.use('/static', express.static(path.join(__dirname, 'views/static')))

// catch 404
app.use(function(req, res, next) {
  res.send("error")
});

connectCounter = 0;

http.listen(3093, () => {
  console.log("Server started on port 3093")
}); 

module.exports = app;
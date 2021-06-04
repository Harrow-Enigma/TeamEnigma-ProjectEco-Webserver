const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

console.log('\x1b[36m%s\x1b[0m',"SERVER > PACKAGES INSTALLED");

module.exports.getIO = function(){
     return io;
}

const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use('/', require('./routes/index.js'));

app.use('/about', require('./routes/about.js'));
app.use('/articles', require('./routes/articles.js'));
app.use('/export', require('./routes/export.js'))
app.use('/export', require('./routes/download.js'));

app.use('/api/v1', require('./routes/apiv1.js'));

app.use('/static', express.static(path.join(__dirname, 'views/static')))

// catch 404
app.use(function(req, res, next) {
  res.send("error")
});

console.log('\x1b[36m%s\x1b[0m',"SERVER > ROUTERS INITIALISED");

connectCounter = 0;

http.listen(3093, () => {
  console.log('\x1b[36m%s\x1b[0m',"SERVER > SERVER STARTED [port 3093]");
}); 

module.exports = app;
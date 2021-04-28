const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');

app.use('/', require('./routes/index.js'));
app.use('/about', require('./routes/about.js'))

app.use('/static', express.static(path.join(__dirname, 'views/static')))


io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    socket.broadcast.emit('hi');
  }, 2000)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("error")
});

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;

app.listen(3000, () => {
  console.log("Server started on port 3000")
});
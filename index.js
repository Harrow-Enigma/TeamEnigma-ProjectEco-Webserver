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
app.use('/api/rest/ai/v1', require('./routes/outputapi.js'));
app.use('/api/rest/sensors/v1', require('./routes/inputapi.js'));

app.use('/static', express.static(path.join(__dirname, 'views/static')))

// catch 404
app.use(function(req, res, next) {
  res.send("error")
});

module.exports = app;

app.listen(3023, () => {
  console.log("Server started on port 3001")
});
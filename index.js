const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');

app.get("/", (req,res) => {
  res.render(path.join(__dirname + '/views/pages/index.ejs'));
});

app.get("/about", (req,res) => {
  res.render(path.join(__dirname + '/views/pages/about.ejs'));
});

app.use('/static', express.static(path.join(__dirname, 'views/static')))

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    socket.broadcast.emit('hi');
  }, 2000)
});

app.listen(3005, () => {
  console.log("Server started on port 3005")
});
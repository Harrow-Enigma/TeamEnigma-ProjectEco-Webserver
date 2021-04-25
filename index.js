const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'static')))

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    socket.broadcast.emit('hi');
  }, 2000)
});

app.listen(3005, () => {
  console.log("Server started on port 3005")
});
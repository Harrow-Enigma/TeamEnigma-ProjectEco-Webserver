var socket = io.connect()
      var app = new Vue({
        el: '#app',
        data: {
          loaded: false
        },
      });

socket.on('message', function (value) { app.loaded = true })
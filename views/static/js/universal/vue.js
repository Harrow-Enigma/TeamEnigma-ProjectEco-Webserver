var socket = io.connect()
      var app = new Vue({
        el: '#app',
        data: {
          data: "<i>Loading</i>",
          loaded: false
        },
      });

socket.on('message', function (value) { app.loaded = true })
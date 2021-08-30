// App.js for Project Eco Webserver
// Project Eco uses a MEVN stack, utilising : MongoDB, Express.js, Vue.js and Node.js (duh). 
// Project Eco Webserver also employs use of EJS, this allows for sever-side site compilation as opposed to Vue.js, which interfaces with the DOM client-side.
// Yes, I know it's a lot to take in; This app.js should have plenty of comments to get you started.

// SET PORT OF EXPRESS SERVER, DEFAULT 3095, but can be changed as system environment variable.
    var port = 3095
    if (!((process.env['port'])==undefined)) {
      var port = process.env['port']
    }

// IMPORTS - firstly, we'll want to import these  libraries.
    const express = require('express'); // Web Application Framework
    const http = require('http') // HTTP library for using the Web Application Framework
    const bodyParser = require("body-parser"); //body-parser for parsing form bodies into json
    const path = require('path'); // Standard good old node.js path library
    const fs = require('fs'); // Standard good old node.js filesystyem library
    const chalk = require('chalk'); // chalk lets our console.log()'s look beautiful in colour

    console.log(chalk.blue('SERVER > PACKAGES INSTALLED'))    

// EXPRESS APP 

    //INITIALISATION
        const app = express(); //init express app
        const server = http.createServer(app);

        const { Server } = require("socket.io"); //init socket
        const io = new Server(server); // Socket.io for full-duplex client<->server side real time transmision
        console.log(chalk.blue('SERVER > SOCKET.IO INITIALISED'))   

    // SHARE SOCKET

        function sortdata(value,location) {
          var inputboth = []


          for (dataset in value) {
                      inputboth.push({
                        "DATE":value[dataset].DATE,
                        "LOCATION1":value[dataset][location]
                      })
                    }
          
                  
                    // Sort array by date in ASCENDING order
                    inputboth.sort(function (a, b) {
                      if (Date.parse(a.x) < Date.parse(b.x)) {
                      return -1;
                      }
                      if (Date.parse(a.x) > Date.parse(b.x)) {
                      return 1;
                      }
                      return 0;
                    });
          return inputboth
        }


        const mongodbModel = require("./models/mongodb.js");
        io.on('connection', function(socket) {
          setInterval(function() {

            var modelobject = mongodbModel.querysensordata(10,"LOCATION1")

            modelobject.exec(function(err, data) {
              if (err) return handleError(err);
              socket.emit('message', { data: sortdata(data,"LOCATION1")})
            })
            }, 3000);

        }); 

    // EJS DECLARATION + USE BODYPARSER
        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({extended:true}));

    // ROUTER POINTERS

        // for each file in views, initiate a router; Except for APIv1, Static, Index and 404.
        fs.readdir("./routes", (err, files) => {
          files.forEach(file => {
            file = file.substring(0, file.length - 3)
              if (!((file === 'apiv1') || (file === 'index'))) {
                app.use('/'+file, require('./routes/'+file+'.js'));
                console.log(chalk.blue('SERVER > ROUTER INITIALISED '+'['+file+']'))    
                }
            });
        });
        
        // Index, APIv1, Static and 404 have exceptions here
        app.use('/', require('./routes/index.js'));
        console.log(chalk.blue('SERVER > ROUTER INITIALISED '+'['+'index'+']'))    

        app.use('/api/v1', require('./routes/apiv1.js'));
        console.log(chalk.blue('SERVER > ROUTER INITIALISED '+'['+'apiv1'+']'))    

        app.use('/static', express.static(path.join(__dirname, 'views/static')))
        console.log(chalk.blue('SERVER > ROUTER INITIALISED '+'['+'static'+']'))    

        app.use('/ai_static', express.static('./views/pages/ai/static'))
        console.log(chalk.blue('SERVER > ROUTER INITIALISED '+'['+'ai_static'+']'))
    
    console.log(chalk.blue('SERVER > ROUTERS INITIALISED'))    

    // START EXPRESS HTTP SERVER
    server.listen(port, () => {
      console.log(chalk.green('SERVER > STARTED @ port '+port))    
    }); 

    /*
    // ACCEPT 404 redirect
        app.use(function (req, res, next) {
          res.status(404)
          var HttpStatus = require('http-status-codes');
          res.render('pages/error.ejs' ,{"pagename":"Error","errorcode":res.statusCode, "errorname":   HttpStatus.getStatusText(res.statusCode)});
        })
        console.log(chalk.blue('SERVER > ROUTER INITIALISED '+'['+'404'+']'))  */


module.exports = app;
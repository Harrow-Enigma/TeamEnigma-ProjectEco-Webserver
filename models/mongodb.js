// MONGODB Interface file. This application interfaces with MongoDB to store our data.
// Contact Dylan K for more details

// ----------------------------------------- //
// INITIALISERS

  // Import Mongoose Library
  var mongoose = require('mongoose');

  // Import Chalk
  const chalk = require('chalk'); // chalk lets our console.log()'s look beautiful in colour

  // Authenticate With MongoDB
  var mongoDBURL = 'mongodb+srv://'+process.env['dbuser']+':'+ process.env['dbpass']+'@'+process.env['dbserver']+'/projecteco?retryWrites=true&w=majority';

  // Connect to MongoDB
  mongoose.connect(mongoDBURL, { useNewUrlParser: true , useUnifiedTopology: true});

  // Error Catch
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Report Active Connection
  db.once("open", function() {
    console.log("\x1b[33m%s\x1b[0m","DATABASE > DATABASE CONNECTED");
  });

// ----------------------------------------- //
// DECLARE DATA STRUCTURES

  // Declare Sensor Data Structure
  var SensorDataSchema = new mongoose.Schema({
      "DATE":{type: Date},
      "LOCATION1": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "TVOC":{type: Number},
        "eCO2": {type:Number},
        "rawH2": {type: Number},
        "rawEthanol": {type: Number}
        },
      "LOCATION2": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "TVOC":{type: Number},
        "eCO2": {type:Number},
        "rawH2": {type: Number},
        "rawEthanol": {type: Number}
        }
      } 
  );

  // Declare form Data Structure
  var FormDataSchema = new mongoose.Schema({
    "DATE":{type: Date},
    "comments" :{type: String}
  });

  // Declare Alert Data Structure
  var AlertaDataSchema = new mongoose.Schema({
    'type': {type: String},
    'title': {type: String},
    'content': {type: String},
    'action': {type: String}, 
    'imageURL': {type: String}
  });

  // Declare Article Data Structure
  var ArticleDataSchema = new mongoose.Schema({
    'DATE' : {type: Date},
    'title': {type: String},
    'imageurl': {type: String},
    'content': {type: String}
  });

// ----------------------------------------- //
// PLACE DATA STRUCTURES IN COLLECTIONS

  // Put sensordataschema data structure into a collection called "sensordata"
  var sensordatamodel = mongoose.model("model", SensorDataSchema, "sensordata");

  // Put formdataschema structure into a collection called "formdata"
  var formdatamodel = mongoose.model("formmodel", FormDataSchema, "formdata");

  var articledatamodel = mongoose.model("articlemodel", ArticleDataSchema, "articledata");

  var alertdatamodel = mongoose.model("alertmodel", AlertaDataSchema, "alertdata");


// ----------------------------------------- //

// FUNCTIONS

  // This one posts sensor data to the DB
  exports.postsensordata = (json) => {
    var date = new Date();
    var datestamp = date.toISOString();
    var doc1 = new sensordatamodel({
    "DATE": datestamp , 
    "LOCATION1":  json["LOCATION1"],
    "LOCATION2": json["LOCATION2"]
    });
    
    doc1.save(function(err, doc) {
      if (err) return console.error(err);
      console.log(chalk.orange('DATABASE > DOCUMENT INSERTED [postsensordata]'))
    });

    return("Success")
  };

  // This one reads sensor data from the DB
  exports.getsensordata = () => {

    return sensordatamodel.find({}, function(err, result) {
      if (err) {
        return(err);
      } else {
        return(result);
      }
    });
  }

  // This one posts form data to the DB
  exports.postformdata = (json) => {
    var date = new Date();
    var datestamp = date.toISOString();
    var doc1 = new formdatamodel({
    "DATE": datestamp , 
    "comments":  json["comments"]
    });
    
    doc1.save(function(err, doc) {
      if (err) return console.error(err);
      console.log(chalk.yellow('DATABASE > DOCUMENT INSERTED [postformdata]'))    

    });

    return("Success")
  };

  // This one posts article data to the DB
  exports.postarticledata = (json) => {
    var date = new Date();
    var datestamp = date.toISOString();

    var doc1 = new articledatamodel({
      "DATE": datestamp, 
      'title': json["title"],
      'imageurl': json["imageurl"],
      'content': json["content"]
    });
    
    doc1.save(function(err, doc) {
      if (err) return console.error(err);
      console.log(chalk.yellow('DATABASE > DOCUMENT INSERTED [articledatamodel]'))    
    });

    return("Success")
  };

  // This one reads articles data from the DB
  exports.getarticlesdata = () => {
    return articledatamodel.find({}, function(err, result) {
      if (err) {
        return(err);
      } else {
        return(result);
      }
    });
  };

  // This one reads article data from the DB
  exports.getarticledata = (title) => {
    return articledatamodel.find({ 'title': { $eq: title } }, function(err, result) {
      if (err) {
        return(err);
      } else {
        return(result);
      }
    });
  };
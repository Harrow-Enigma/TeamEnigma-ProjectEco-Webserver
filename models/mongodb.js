// MONGODB Interface file. This application interfaces with MongoDB to store our data.
// Contact Dylan K for more details

// ----------------------------------------- //
// INITIALISERS

  // Import Mongoose Library
  var mongoose = require('mongoose');

  // use waqui
  const waqiModel = require("../models/waqi.js");

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
      },
      "DERBY": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "TVOC":{type: Number},
        "eCO2": {type:Number},
        "rawH2": {type: Number},
        "rawEthanol": {type: Number}
      }}
  );

  // Declare form Data Structure
  var FormDataSchema = new mongoose.Schema({
    "DATE":{type: Date},
    "q1" :{type: Number},
    "q2" :{type: Number},
    "q3" :{type: Number},
    "q4" :{type: String},
    "q5" :{type: String},
    "localpollutiondata": {
        "Latitude":{type: Number},
        "Longitude":{type: Number},
        "data" :{type:Object}}
  });

  // Declare Alert Data Structure
  var AlertDataSchema = new mongoose.Schema({
    'DATE': {type: Date},
    'type': {type: String},
    'id': {type: Number},
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
    'content': {type: String},
    'featured': {type : Boolean},
    'author' : {type :String}
  });

// ----------------------------------------- //
// PLACE DATA STRUCTURES IN COLLECTIONS

  // Put sensordataschema data structure into a collection called "sensordata"
  var sensordatamodel = mongoose.model("model", SensorDataSchema, "sensordata");

  // Put formdataschema structure into a collection called "formdata"
  var formdatamodel = mongoose.model("formmodel", FormDataSchema, "formdata");

  var articledatamodel = mongoose.model("articlemodel", ArticleDataSchema, "articledata");

  var alertdatamodel = mongoose.model("alertmodel", AlertDataSchema, "alertdata");


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
      console.log(chalk.yellow('DATABASE > DOCUMENT INSERTED [postsensordata]'))
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

  // This one reads sensor data from the DB
  exports.querysensordata = (minutesago,location) => { 
    //var query = { : , $location : }
    
    var datevariablename = "DATE";
    var datequerystring = { $lt: new Date(), $gte: new Date(new Date().getTime() - 1000 * 60 * minutesago)};

    var locationvariablename = location;
    var locationquerystring = { $exists : true };

    var query = {};

    query[datevariablename] = datequerystring;
    query[locationvariablename] = locationquerystring;

    return sensordatamodel.find(query, function(err, result) {
      if (err) {
        return(err);
      } else {
        return(result);
      }
    });
  }

  // This one posts form data to the DB
  exports.postformdata = async (json) => {
    var date = new Date();
    var datestamp = date.toISOString();

    var weatherstationdata = await waqiModel.getlocalpollutiondata(json["q6.1"],json["q6.2"])

    var doc1 = new formdatamodel({
    "DATE": datestamp , 
    "q1":  json["q1"],
    "q2":  json["q2"],
    "q3":  json["q3"],
    "q4":  json["q4"],
    "q5":  json["q5"],
    "localpollutiondata": {
        "Latitude":json["q6.1"],
        "Longitude":json["q6.2"],
        "data" : weatherstationdata
        }
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
      'content': json["content"],
      'featured' : json["featured"],
      'author' : json["author"]
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

  // This one posts alert data to the DB
  exports.postalertedata = (json) => {
    var date = new Date();
    var datestamp = date.toISOString();

    var doc1 = new alertdatamodel({
      "DATE": datestamp, 
      'type': json["type"],
      'id': json["id"],
      'title': json["title"],
      'imageURL': json["imageURL"],
      'content': json["content"],
      'action': json["action"]
    });
    
    doc1.save(function(err, doc) {
      if (err) return console.error(err);
      console.log(chalk.yellow('DATABASE > DOCUMENT INSERTED [alertdatamodel]'))    
    });

    return("Success")
  };

  // This one reads alerts data from the DB
  exports.getalertsdata = () => {
    return alertdatamodel.find({}, function(err, result) {
      if (err) {
        return(err);
      } else {
        return(result);
      }
    });
  };

  // This one reads alert data from the DB
  exports.getalertdata = (title, id) => {
    return alertdatamodel.find({ 'title': { $eq: title }, 'id': { $eq: id } }, function(err, result) {
      if (err) {
        return(err);
      } else {
        return(result);
      }
    });
  };

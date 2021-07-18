// Import Mongoose Library
var mongoose = require('mongoose');

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

// Declare Data Structure
var DataSchema = new mongoose.Schema({
    "DATE":{type: Date},
    "comments" :{type: String}
});

// Put this data structure into a collection called "sensordata"
var formdatamodel = mongoose.model("formmodel", DataSchema, "formdata");

// ----------------------------------------- //


// FUNCTIONS

  // This one posts data to the DB

exports.postformdata = (json) => {
  var date = new Date();
  var datestamp = date.toISOString();
  var doc1 = new formdatamodel({
  "DATE": datestamp , 
  "comments":  json["comments"]
  });
  
  doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("\x1b[33m%s\x1b[0m","DATABASE > DOCUMENT INSERTED [postformdata]");
  });

  return("Success")
};

  // and this one reads it
exports.getformdata = () => {

  return sensordatamodel.find({}, function(err, result) {
    if (err) {
      return(err);
    } else {
      return(result);
    }
  });
}


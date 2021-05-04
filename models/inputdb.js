exports.postDBdata = (json) => {
  var mongoose = require('mongoose');
  var mongoDB = 'mongodb+srv://dbUser:f1tizBKyBvJnVSlg@cluster0.3huvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once("open", function() {
    console.log("Connection Successful!");
  });

  var Schema = mongoose.Schema;

  var DataSchema = new Schema({
      "DATE":{type: Date},
      "LOCATION1": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "CO2":{type: Number}
        },
      "LOCATION2": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "CO2":{type: Number}
        }
      }
  );

  var Model = mongoose.model("model", DataSchema, "myCollection");
  
    var doc1 = new Model({
    "DATE": json["DATE"], 
    "LOCATION1":  json["LOCATION1"],
    "LOCATION2": json["LOCATION2"]
  });
  
  doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });

  return("Success")
};

exports.getDBdata = () => {
  var mongoose = require('mongoose');
  var mongoDB = '';

  mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once("open", function() {
    console.log("Connection Successful!");
  });

  var Schema = mongoose.Schema;

  var DataSchema = new Schema({
      "DATE":{type: Date},
      "LOCATION1": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "CO2":{type: Number}
        },
      "LOCATION2": {
        "Temperature":{type: Number},
        "Humidity":{type: Number},
        "CO2":{type: Number}
        }
      }
  );

  Model.find({}, function(err, result) {
    if (err) {
      return(err)
    } else {
      return(result)
    }
  });
}
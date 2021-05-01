// this is sample data for now
var express = require('express');
var router = express.Router();

router.get("/", (req,res, next) => {
  res.send({

  "2021-07-28T20:50:28+0000": {
    "LOCATION1": {
      "Temperature": 32,
      "Humidity": 13,
      "CO2": 103
    },
    "LOCATION2": {
      "Temperature": 26,
      "Humidity": 7,
      "CO2": 76
    },
  },
  "2021-07-28T20:50:30+0000": {
    "LOCATION1": {
      "Temperature": 31,
      "Humidity": 16,
      "CO2": 123
    },
    "LOCATION2": {
      "Temperature": 29,
      "Humidity": 10,
      "CO2": 123
    },
  }
  
  
  })
  });

module.exports = router;
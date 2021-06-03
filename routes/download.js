const converter = require('json-2-csv');

var express = require('express');
var router = express.Router();

const mongodbModel = require("../models/sensormongodb.js");

router.get("/", async (req,res, next) => {

  const data = await mongodbModel.getsensordata()

  // convert JSON array to CSV string
  await converter.json2csv(data, (err, csv) => {
      if (err) {
          throw err;
      }
      res.send(data)
  });
});


module.exports = router;
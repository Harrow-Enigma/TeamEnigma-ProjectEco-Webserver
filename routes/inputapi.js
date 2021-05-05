var express = require('express');
var router = express.Router();

router.use(express.json());

const mongodbModel = require("../models/sensormongodb.js");

router.post("/", (req,res, next) => {
  //auth plugin needed.
      
  mongodbModel.postDBdata(req.body);
  res.sendStatus(200);
});

module.exports = router;
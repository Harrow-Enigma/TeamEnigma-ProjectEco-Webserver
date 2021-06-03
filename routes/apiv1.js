var express = require('express');
var router = express.Router();

router.use(express.json());

const mongodbModel = require("../models/sensormongodb.js");

router.post("/rest/input/sensors/", (req,res, next) => {
  //auth plugin needed.
      
  mongodbModel.postDBdata(req.body);
  res.sendStatus(200);
});

router.post("/rest/input/ai/", (req,res, next) => {
  //auth plugin needed.
      
  //mongodbModel.postDBdata(req.body);
  res.sendStatus(200);
});

router.get("/rest/output/", async (req,res, next) => {
  const data = await mongodbModel.getDBdata()
  res.send(data)
});

module.exports = router;
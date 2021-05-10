// this is sample data for now
var express = require('express');
var router = express.Router();
router.use(express.json());

const mongodbModel = require("../models/sensormongodb.js");



router.get("/", async (req,res, next) => {
  const data = await mongodbModel.getDBdata()
  res.send(data)
});

module.exports = router;
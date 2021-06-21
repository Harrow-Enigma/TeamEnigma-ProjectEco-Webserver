var express = require('express');
var router = express.Router();

router.use(express.json());

const mongodbModel = require("../models/sensormongodb.js");

router.post("/rest/input/ai/", (req,res,next) => {

});

router.post("/rest/input/sensors/", (req,res,next) => {
  mongodbModel.get
  mongodbModel.postsensordata(req.body);
  res.sendStatus(200)
});

router.get("/rest/output/", async (req,res, next) => {
  const data = await mongodbModel.getsensordata()
  res.send(data)
});



module.exports = router;
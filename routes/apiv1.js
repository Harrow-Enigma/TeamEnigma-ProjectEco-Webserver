var express = require('express');
var router = express.Router();

router.use(express.json());

const mongodbModel = require("../models/mongodb.js");
mongodbModel.get

router.post("/rest/input/ai/", (req,res,next) => {

});

router.post("/rest/input/sensors/", (req,res,next) => {
  if (typeof req.body.token == 'undefined') {
    res.sendStatus(401)
  } else {
    if (req.body.token  == process.env['dbpass']) {
      mongodbModel.postsensordata(req.body);
      res.sendStatus(200)  
      } else {
      res.sendStatus(401)
    }
  }
});

router.post("/rest/input/articles/", (req,res,next) => {
  if (typeof req.body.token == 'undefined') {
    res.sendStatus(401)
  } else {
    if (req.body.token  == process.env['dbpass']) {
      mongodbModel.postarticledata(req.body);
      res.sendStatus(200)  
      } else {
      res.sendStatus(401)
    }
  }
});

router.get("/rest/output/sensors", async (req,res, next) => {
  const data = await mongodbModel.getsensordata()
  res.send(data)
});

router.get("/rest/output/articles", async (req,res, next) => {
  const data = await mongodbModel.getarticlesdata()
  res.send(data)
});

module.exports = router;
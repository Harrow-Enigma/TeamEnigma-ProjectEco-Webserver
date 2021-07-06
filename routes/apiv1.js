var express = require('express');
var router = express.Router();

router.use(express.json());

const mongodbModel = require("../models/sensormongodb.js");

router.post("/rest/input/ai/", (req,res,next) => {

});

router.post("/rest/input/sensors/", (req,res,next) => {
  if (typeof req.body.token == 'undefined') {
    res.sendStatus(401)
  } else {
    if (req.body.token  == process.env['dbpass']) {
      mongodbModel.get
      mongodbModel.postsensordata(req.body);
      res.sendStatus(200)  
      } else {
      res.sendStatus(401)
    }
  }
});

router.get("/rest/output/", async (req,res, next) => {
  const data = await mongodbModel.getsensordata()
  res.send(data)
});



module.exports = router;
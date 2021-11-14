var express = require('express');
var router = express.Router();

router.use(express.json());

const mongodbModel = require("../models/mongodb.js");
mongodbModel.get

router.post("/rest/input/ai/", (req,res,next) => {

});

router.post("/email", async (req,res) => {
  try {
    mongodbModel.postemaildata(req.body);
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
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

router.post("/rest/input/alerts/", (req,res,next) => {
  if (typeof req.body.token == 'undefined') {
    res.sendStatus(401)
  } else {
    if (req.body.token  == process.env['dbpass']) {
      mongodbModel.postalertdata(req.body);
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

router.get("/rest/output/formnumberofresponses", async (req,res, next) => {
  const data = await mongodbModel.countformdata()
  res.send(data)
});

router.get("/rest/output/queriedsensors", async (req,res, next) => {
  const data = await mongodbModel.querysensordata(req.body.minutesago)
  res.send(data)
});

router.get("/rest/output/articles", async (req,res, next) => {
  const data = await mongodbModel.getarticlesdata()
  res.send(data)
});

router.get("/rest/output/article", async (req,res, next) => {
  const data = await mongodbModel.getarticledata(req.headers.title)
  res.send(data[0])
});

router.get("/rest/output/alerts", async (req,res, next) => {
  const data = await mongodbModel.getalertsdata()
  res.send(data)
});

router.get("/rest/output/forms", async (req,res, next) => {
  const data = await mongodbModel.getformsdata()
  res.send(data)
});

router.get("/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret", async (req,res, next) => {
  res.send({"Somehow wrapping this message in JSON makes it display better on mobile": "🤫 The existence of this page is a massive secret.\nWant more secrets?\nTry Caesar shifting an all-lowercase version of our team name (without space or puncatuations). There is a page at one of these locations.\n(also try appending team member names at the end of this api call path)"})
});

router.get("/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/david", async (req,res, next) => {
  res.send({"github": "null / unknown / boring", "message": "🤫 Shhhh David is ANGRY!", "biggest_comtribution": "The boss and bogeyman."})
});

/*
https://dev-test.projecteco.ml/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/david
*/

router.get("/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/dylan", async (req,res, next) => {
  res.send({"github": "normal / boring", "message": "🤫 Shhhh Dylan raving about Drehmal!", "biggest_comtribution": "The worldwide web."})
});

router.get("/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/george", async (req,res, next) => {
  res.send({"github": "filamity", "message": "🤫 Shhhh Geroge is working!", "biggest_comtribution": "The walrus / https://youtu.be/k7YVxLLIuGM"})
});

router.get("/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/vincent", async (req,res, next) => {
  res.send({"github": "null / unknown / boring", "message": "🤫 Shhhh What a G!", "biggest_comtribution": "You reading this rn."})
});

router.get("/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret/secret", async (req,res, next) => {
  res.send({"Somehow wrapping this message in JSON makes it display better on mobile": "🤷 Are you bored yet?"})
});

module.exports = router;

var express = require('express');
var router = express.Router();
const mongodbModel = require("../models/mongodb.js");

router.get("/", (req,res, next) => {
  res.render('pages/survey.ejs' ,{"pagename":"Survey"});
  
});

router.post("/success", async (req,res) => {
  try {
    const a = await mongodbModel.countformdata()
    console.log(a)
    mongodbModel.postformdata(req.body);
    res.render('pages/submitted.ejs' ,{"pagename":"Submitted", "data":JSON.stringify(req.body),"formcount":a});
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

module.exports = router;
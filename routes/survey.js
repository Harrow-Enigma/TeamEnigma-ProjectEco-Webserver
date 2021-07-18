var express = require('express');
var router = express.Router();
const mongodbModel = require("../models/formmongodb.js");


router.get("/", (req,res, next) => {
  res.render('pages/survey.ejs' ,{"pagename":"Survey"});
});

router.post("/success", (req,res) => {
  mongodbModel.postformdata(req.body);
  res.render('pages/submitted.ejs' ,{"pagename":"Submitted", "data":JSON.stringify(req.body)});
});

module.exports = router;
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
router.use(bodyParser());

// parse application/json
router.use(bodyParser.json())

router.get("/", (req,res, next) => {
  res.render('pages/survey.ejs' ,{"pagename":"Survey"});
});

router.post("/success", (req,res, next) => {
  console.log(req.body.sitenumber)
  res.render('pages/survey.ejs' ,{"pagename":"SurveySubmitted"});
});

module.exports = router;
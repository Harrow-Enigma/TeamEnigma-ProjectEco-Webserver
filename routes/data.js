var express = require('express');
var router = express.Router();

router.get("/", (req,res, next) => {
  res.render('pages/data.ejs' ,{"pagename":"Data"});
});

module.exports = router;
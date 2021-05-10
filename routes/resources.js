var express = require('express');
var router = express.Router();

router.get("/", (req,res, next) => {
  res.render('pages/resources.ejs' ,{"pagename":"Resources"});
});

module.exports = router;
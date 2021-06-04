var express = require('express');
var router = express.Router();

router.get("/", (req,res, next) => {
  res.render('pages/articles.ejs' ,{"pagename":"Articles"});
});

module.exports = router;
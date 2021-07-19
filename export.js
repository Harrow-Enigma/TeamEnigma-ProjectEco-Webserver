var express = require('express');
var router = express.Router();

router.get("/", (req,res, next) => {
  res.render('pages/export.ejs' ,{"pagename":"Export"});
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.get("/", (req,res, next) => {
  res.render('pages/ai/index.ejs' ,{"pagename":"Realtime AI Demo"});
});

module.exports = router;

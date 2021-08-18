var express = require('express');
var router = express.Router();


router.get("/", (req, res, next) => {
  res.render('pages/index.ejs', { "pagename": "Home" });
});

router.get("/grnzravtzn", (req, res, next) => {
  res.render('pages/coolio.ejs', { "pagename": "COOL!" });
});

module.exports = router;


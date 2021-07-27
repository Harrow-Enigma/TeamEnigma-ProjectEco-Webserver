var express = require('express');
var router = express.Router();

const mongodbModel = require("../models/mongodb.js");
mongodbModel.get

router.get("/", (req,res, next) => {
  res.render('pages/alerts.ejs',
  {"pagename":"Alerts"});
});

router.get("/:alertid", async (req,res, next) => {
  
  _title = decodeURI(req.params.alertid).split('?id=')[0]
  _id = parseInt(decodeURI(req.params.alertid).split('?id=')[1])

  const data = await mongodbModel.getalertdata(_title, _id)
  console.log()

  res.render('pages/alerts.ejs' ,{"pagename":"Alerts", "alerttitle":data[0].title, "alertcontent":data[0].content, "alertimageURL":data[0].imageURL, "alertdate":data[0].DATE, "alerttype":data[0].type, "alertaction":data[0].action});
});

module.exports = router;

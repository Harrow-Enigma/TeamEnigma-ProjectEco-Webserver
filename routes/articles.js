var express = require('express');
var router = express.Router();

const mongodbModel = require("../models/mongodb.js");
mongodbModel.get

router.get("/", (req,res, next) => {
  res.render('pages/articles.ejs' ,{"pagename":"Articles"});
});

router.get("/:postid", async (req,res, next) => {
  
  const data = await mongodbModel.getarticledata(decodeURI(req.params.postid))
  console.log()

  res.render('pages/article.ejs' ,{"pagename":"Article", "articlename":data[0].title, "articlecontent":data[0].content, "articleimageurl":data[0].imageurl, "articledate":data[0].DATE});
});

module.exports = router;
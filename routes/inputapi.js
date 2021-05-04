var express = require('express');
var router = express.Router();

router.use(express.json());

const dbInputModel = require("../models/inputdb.js");

router.post("/", (req,res, next) => {
  dbInputModel.initDBdata();
  dbInputModel.postDBdata(req.body);
  res.sendStatus(200);
});

module.exports = router;
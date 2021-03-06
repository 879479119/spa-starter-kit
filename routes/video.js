var fs =require('fs');
var express = require('express');
var router = express.Router();
var path = require('path');
var sourcePort = require('../config').dev.sourcePort;
router.get('/', function(req, res, next) {
  res.render('index', { title: '(<ゝω·)Kira☆~', sourcePort: sourcePort, page: "video"});
});

/**
 * API - getFunImages
 * @param size {number}
 * @param page {number} from 0 to max
 * @param rand {bool}
 */

router.get('/getFunImages', function (req, res, next) {
  var data = JSON.parse(fs.readFileSync('static/fun_images.json','utf8')).fix;

  var size = req.query.size || 28,
      page = req.query.page || 0,
      rand = req.query.rand;
  var result = [];
  var len = data.length;
  if(rand){
    var i = size;
    while(i --)
      result.push(data[Math.floor(Math.random() * len)]);
  }else{
    result = data.splice(page * size, size);
  }

  res.send({length: len, list: result});
  res.end();
})


/**
 * API - getRank
 * @param field {number}
 */

router.get('/getRank', function (req, res, next) {
  var field = req.query.field || 0;
  var data = JSON.parse(fs.readFileSync('static/rank/r'+field+'-3.json','utf8'));
  res.send(data);
  res.end();
})

module.exports = router;

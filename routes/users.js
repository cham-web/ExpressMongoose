var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.headers, '6----------------');
  res.json({title: '123'})
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.send('/api/index');
});

router.use('/db', require('./db/index'));
module.exports = router;

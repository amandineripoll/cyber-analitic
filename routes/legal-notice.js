var express = require('express');
var router = express.Router();

/* GET map */
router.get('/', function(req, res, next) {
  res.render('legal-notice');
});

module.exports = router;

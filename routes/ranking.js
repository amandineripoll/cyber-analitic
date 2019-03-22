var express = require('express');
var router = express.Router();

/* GET ranking. */
router.get('/', function(req, res, next) {
  res.render('ranking', { root: 'ranking' });
});

module.exports = router;

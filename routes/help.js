var express = require('express');
var router = express.Router();

/* GET help. */
router.get('/', function(req, res, next) {
  res.render('help', { root: 'help' });
});

module.exports = router;

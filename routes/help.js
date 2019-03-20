var express = require('express');
var router = express.Router();

/* GET help. */
router.get('/', function(req, res, next) {
  res.render('help', { title: 'Harassment-analytic - Besoin d\'aide' });
});

module.exports = router;

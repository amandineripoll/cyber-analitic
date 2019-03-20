var express = require('express');
var router = express.Router();

/* GET stats */
router.get('/', function(req, res, next) {
  res.render('stats', { title: 'Harassment-analytic - Statistiques' });
});

module.exports = router;

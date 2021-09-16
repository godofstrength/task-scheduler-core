var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/homepage', { title: 'Express' });
});
router.get('/register', function(req, res){
  res.render('pages/register');
})
router.get('/dashboard', function(req, res){
  res.render('layout/dashboard');
})
module.exports = router;

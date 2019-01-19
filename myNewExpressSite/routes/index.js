var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const date = new Date(1969,6,20);
  // res.set('Date',date);
  // res.set('Cache-Control','no-store');
  // res.set('Content-Type','text/html');
  //fresh and stale they return boolean values
  // fresh returns true if it is not stale
  // stale returns true if it is not fresh 
  // console.log(req.fresh)
  // console.log(req.stale)
  console.log(req.accepts('json'));
  res.render('index', { title: 'Express' });
});

module.exports = router;

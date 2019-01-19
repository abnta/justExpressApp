var express = require('express');
var router = express.Router();

const movies = require('./../data/movies');
const people = require('./../data/people');

/* GET search page. */
// /search/...
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use((req,res,next)=>{
  const searchTerm = req.query.query;
  if(!searchTerm){
    res.json({msg:"Query is required!!"});
  }else{
    next()
  }
})

// /search/movie
router.get('/movie',(req,res,next)=>{
  const searchTerm = req.query.query
  const results = movies.filter((movie)=>{
    let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  })
  res.json({results});
})
// /search/person
router.get('/person',(req,res,next)=>{
  const searchTerm = req.query.query
  const results = people.filter((person)=>{
    let found = person.name.includes(searchTerm)
    return found;
  })
  res.json({results});
})


module.exports = router;

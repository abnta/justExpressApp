var express = require('express');
var router = express.Router();

const movies = require('./../data/movies');
/* GET movie page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular',(req,res,next)=>{
  let page = req.query.page ;
  if(page === undefined){
    page = 1;
  }
    let results = movies.filter((movie)=>{
    return movie.most_popular;
  })
  // console.log(results);
  const indexToStart = (page-1)*20
  results = results.slice(indexToStart,indexToStart+19);
  res.json({results:results,
    page:page
  });

  
  
})



module.exports = router;

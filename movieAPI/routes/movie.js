var express = require('express');
var router = express.Router();

const movieDetails = require('./../data/movieDetails');

function requireJSON(req,res,next){
  if(!req.is('application/json')){
    res.json({msg:"Content type must be application/json"})
  }else{
    next();
  }
}

router.param('movieId',(req,res,next,movieId)=>{
  //if only certain api_key were allowed to hit movieId api
  //update in Db with analytics that someone viewed the movie with movieID
  console.log('someone viewed the movie with Id: ', movieId);
  next();
})

/* GET movie page. */
// /movie/...
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//get movie/top_rated
router.get('/top_rated',(req,res,next)=>{
  let page = req.query.page;
  if(!page){
    page=1
  }
  const results = movieDetails.sort((a,b)=>{
    return b.vote_average - a.vote_average
  })

  let IndexToStart = (page-1)*20;
  res.json(results.slice(IndexToStart,IndexToStart+19));
})
//this one should be last as movie/something will always be catched by it
//Get /movie/movieId
router.get('/:movieId',(req,res,next)=>{
  const movieId = req.params.movieId;
  const results = movieDetails.find((movie)=>{
    return movie.id == movieId
  })
  if(!results){
    res.json({
      msg:"invalid id"
    })
  }else{
    res.json(results);
  }
  
  
})

//post /movie/{movieId}/rating
router.post('/:movieId/rating',requireJSON,(req,res,next)=>{
  const movieId = req.params.movieId;
  // console.log(req.get('Content-Type'));
  const userRating = req.body.value;
  if(userRating<.5 || userRating>10){
    res.json({msg:"rating must be between .5 and 10"});
  }else{
    res.json({
      msg:"Thankyou for the rating",
      statusCode:201
    })
  }
  
  
})
//delete /movie/{movieId}/rating
router.delete('/:movieId/rating',requireJSON,(req,res,next)=>{
  res.json({msg:"rating deleted"});
})

module.exports = router;

var express = require('express');
var router = express.Router();
const request = require('request');

//const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiKey = '123456789';
// const apiBaseUrl = 'http://api.themoviedb.org/3';
const apiBaseUrl = 'http://localhost:3030'
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
// most_popular?api_key=123456789
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req,res,next)=>{
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})
/* GET home page. */
router.get('/', function(req, res, next) {
  //request takes two params
  //1. url to send the get request at
  //2. callback function which is triggered when the request is consumed or over
  //callback function takes 3 params as per request modules defination
  //1. error object
  //2. http response object
  //3. the Json response from the server
  request.get(nowPlayingUrl,(err,response,movieData)=>{
    // console.log('============theError===========');
    // console.log(err);
    // console.log('=============theResponse==============');
    console.log('=========movieData==========');
    console.log(movieData);
    const parsedData = JSON.parse(movieData);
    // console.log(parsedData)
    res.render('index',{
      parsedData: parsedData.results
    })
  })
});

router.get('/movie/:id',(req,res,next)=>{
  // res.json(req.params.id);
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
  request.get(thisMovieUrl,(err,response,thisMovieData)=>{
    // console.log(thisMovieData);
    const parsedData = JSON.parse(thisMovieData)
    res.render('single-movie',{
      parsedData: parsedData
    })
  })
  // res.send(thisMovieUrl);
})

router.post('/search',(req,res,next)=>{
  // res.send('sanity check');
  const userSearchTerm = encodeURI(req.body.movieSearch) ;
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`
  // res.send(movieUrl);
  request.get(movieUrl,(err,response,movieData)=>{
    let parsedData = JSON.parse(movieData);
    if(cat=="person"){
      parsedData.results = parsedData.results[0].known_for
    }
    // res.json(parsedData);
    res.render('index',{
      parsedData:parsedData.results
    })
  })
  
})

module.exports = router;

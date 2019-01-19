const express = require('express');

let router = express.Router();

function validateUser(req,res,next){
    res.locals.validated = true;
    console.log('validated');
    next();
}

//it is a middlewear which will only trigger inside this route
router.use(validateUser);

//instead of app.get() we will use router.get()
router.get('/',(req,res,next)=>{
    res.json('UserRouter Works');
});

module.exports = router;

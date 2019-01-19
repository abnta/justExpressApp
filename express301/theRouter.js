const express = require('express');

let router = express.Router();

//we also have router.use
//it works the same way as app.use
//but it works only inside this file 
//i.e if there is http call to the route on which this router is mounted then router.use will trigger

//instead of app.get() we will use router.get()
router.get('/',(req,res,next)=>{
    res.json('router Works');
});
//just like we have 
//router.post()
//router.put()
// router.delete()
//router.all()

module.exports = router;

const express = require('express');
const app = express();

//express as per documentation is made of 2 things
//1.Router
//2.Middlewear that comparises a web framework

// req -----Middlewear-----> res
//a middlewear function is any function which has access to req,res,next

// req -----Middlewear-----> res
// 1. request comes in
// 2.We need to validate the User, sometimes
// 3.We need to store somthings in DB
// 4. if there is some data we need to parse it and save it
// 5.res
function validateUser(req,res,next){
    //get info out of the req object
    //do some stuff with the db
    //locals is used to send data to a template, it has request level information
    //like req path name, authenticated user, user settings an more, print it look into it.
    res.locals.validated = true;
    console.log('validated Ran')
    next();
}
//it will run on all requests
app.use(validateUser);
//it will run only on routes /admin all http verbs
app.use('/admin',validateUser);
//this will run on / route and specific to get requests/verb
app.get('/',validateUser);

app.get('/',(req,res,next)=>{
    res.send('<h1>Main Page</h1>')
    console.log(res.locals.validated);
})

app.get('/admin',(req,res,next)=>{
    res.send('<h1>Admin Page</h1>')
    console.log(res.locals.validated);
})

app.listen(3000,()=>{
    console.log('app running at port ...3000');
})
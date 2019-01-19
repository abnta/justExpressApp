const path = require('path');

const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

app.use(helmet());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

app.use((req,res,next)=>{
    if(req.query.msg==='fail'){
        res.locals.msg = 'Sorry.This username and password combination does not exist.';
    }else{
        res.locals.msg = '';
    }
    next();
});

app.get('/',(req,res,next)=>{
    res.send('Sanity Check');
});

app.get('/login',(req,res)=>{
    //the req object has a query property in Express
    //req.query is an object which has key : value parirs coming from after ?key1=value1&key2=value2.....so on
    //we put insecure data in query strings as they are visible at client end
    // console.log(req.query);
    res.render('login');
});

app.post('/process_login',(req,res,next)=>{
    //req.body is made by url encoded, which parses the http message for sent data
    const password = req.body.password;
    const username = req.body.username;
    //we will ideally go and check whether the user credentials are valid
    //if they are valid 
    //** *--save them to cookie**-we do this as the details are redily availble in browser.
    //**we can also acheive it using sessions cookies and session are very similar */
    //difference is cookies are stored in browsers and are sent to the server with every request
    //sessions are stored in servers and browsers have a key referencing to the sessions stored at the server
    //-then send them to welcome page.
    if(password==='x'){
        //res.cookies takes atleast 2 arg:
        //1. it takes the name of the cookie
        //2. the value to set it to
        res.cookie('username',username);
        //res.redirect takes ine arg 
        //1.where to send the browser
        res.redirect('/welcome');
    }else{
        //? is a special character in the url, after ?
        //it is a query parameter
        res.redirect('/login?msg=fail&test=hello')
    }
    
});

app.get('/welcome',(req,res,next)=>{
    res.render('welcome',{
        username:req.cookies.username
    });
});

//app.param() it is a middle wear
//it takes 2 args:
//1. the param to look for in the req.params
//2. the callback function which takes req,res,next,paramKey
app.param('id',(req,res,next,id)=>{
    console.log("app.param Called and looked for id:",id);
    next();
});

app.get('/story/:id',(req,res)=>{
    //if a route has : then it is a wildcard i.e a params
    //the params object always exists its empty if there is no params
    //if there is a wildcard ':' set then it will take the key and value pair as an object which carries the wildcard value
    res.send(`<h1>The Story ${req.params.id}</h1>`)
});

app.get('/statement',(req,res,next)=>{
    // this will render a image in the browser as express and browser both have power
    // to send the content-type image and read the type image
    // res.sendFile(path.join(__dirname,'userStatements/BankStatement.png'));
    
    // app(bola isliye likha hai aur ye bhi hosakta hai express app append kar raha ho res mein ye method) 
    //has a download method i.e appended in res 
    //it takes 2 agrs:
    //1. filename
    //2. optionally what you want the filename to download as
    //3. it is an error callback function which has one arg that carries an error.

    //download is setting the headers for us
    //it is setting content-disposition to attachement with a filename = 2nd arg that we pass.
    res.download(path.join(__dirname,'userStatements/BankStatement.png'),'statement',(error)=>{
        //if there is an error in sending the file then the headers may be set.
        console.log(error);
        //what we can do here : send user to error page.
        //but this can't be achieved as res headers are already set and the response has travelled to the browser
        //we don't have a request to work with in my terms also for a request we can set the headers and send back only once
        if(error){
            //so tackle headers issue we have a property in res
            //res.headersSent which returns a boolean
            if(!res.headersSent){
                res.redirect('/download/error');
            }
        }
    });

    //we can also use res.attachment as 
    //it only sets the headers for content-disposition to attachment
    //and if we provide a second paramenter then gives the filename= 2nd parameter
    //res.attachment(path.join(__dirname,'userStatements/BankStatement.png'),'statement);

    //we can manually set headers using and then send the file using res.sendFile
    //res.set('Content-Disposition','attachment');
    //res.sendFile(pathOfTheFile)

});

app.get('/logout',(req,res,next)=>{
    //res.clearCookies take 1 arg:
    //1. cookie to clear by name
    res.clearCookie('username');
    res.redirect('/login');
});

app.listen(3000,()=>{
    console.log('listening at port...3000');
});

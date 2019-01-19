const path = require('path');

const express = require('express');
const app = express();
const helmet = require('helmet');


//securing the headers
app.use(helmet());
//serving up static files
app.use(express.static('public'));
//parsing json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//.set takes 2 args we can use it to set any thing that we want in our app.
// 1.arg is a key
// 2. arg has the value of that key
//there are some predefined key values which are defined by express authors for specific use
//one of the key value which is predefined is a view engine. 
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));


// 1.express how it runs now we have a high level idea.
// 2.We define a view Engine.
// -ejs
// -mustache
// -handlebars
// -jade/pug
// 3.inside one of our routes we have res.render
// 4. We pass 2 things that res.render needs
// --the file we want to render
// --the data that file, template needs
//5. express uses the node modules for the specified view engine and parses the file
//--it means it takes the Html, css, Js and combines with the depecdencies of our view engine modules and develops a code to be sent to the browser to render a UI
//6. The final product of this is a UI which is completely JS,Html,Css readable by browser.

function validateUser(req,res,next){
    //...validated logic
    res.locals.validated = true;
    next();
}

app.use(validateUser);

app.get('/',(req,res,next)=>{
    //the data in the 2nd arg is going to be appended to res.local
    res.render('index',{});
});

app.get('/about',(req,res)=>{
    res.render('about',{});
})

app.listen(3000,()=>{
    console.log('Server running at port.... 3000');
})
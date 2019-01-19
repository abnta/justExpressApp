// NodeJs is the language used in expressJs
// NodeJs is written in c it uses Chrome V8 engine which is in C
//express is a node module
//path is a native module
const path = require('path');

//http is a native module
//express is a third party module. so we have to run npm install express --save
const express = require('express');
//an app is the express function (createApplication inside express module)
//invoked an returns an express application
const app = express();

//serve up static files
app.use(express.static('public'));

// .all is a method and it takes 2 args:
// 1. Route
// 2. callback function when the route is requested
app.all('/',(req,res)=>{
    // express handles the basic headers (status,mimetype ie content-type in node)
    // read Node.html
    console.log(__dirname+'/node.html');
    res.sendFile(path.join(__dirname+'/node.html'));
    // res.send('<h1>This is the home page</h1>')
    //express handles the end
});

app.all('*',(req,res)=>{
    res.send('<h1>This page is not available</h1>');
});

app.listen(3000,()=>{
    console.log('Server is listening at port...3000');
});
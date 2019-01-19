const express = require('express');
const app = express();
const helmet = require('helmet');

//2 impt methods not yet used. 
//and some more middlewears that not native to express

//this is for security purpuse go through documentation for further clarification
//it overwrites the headers once we are in the application and makes it safe 
//as there could be some intrution between sending the request from client to the server
//that is high level that i got up till now.
app.use(helmet());

app.use(express.static('public'));

//it creates req.body and serves mimetype or contentType: text/json
app.use(express.json());
//it also creates req.body ,it serves urlEncoded type of data like form data.
app.use(express.urlencoded({extended:false}));

//so the first three things to use in the server are 
//0.use helmet
//1.serve static
//2.json middlewear
//3.urlencoded middlewear 

app.post('/ajax',(req,res)=>{
    console.log(req.body);
    res.status(201).json(["test",2,5,7]);
});

app.listen(3000);
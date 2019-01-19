const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

const router = require('./theRouter');
const userRouter = require('./userRouter');
//we can use multiple routers as this
app.use('/',router);
app.use('/user',userRouter);
// like
// app.use('/admin',router);
// app.use('/user',router);

app.listen(3000,()=>{
    console.log('listening at port 3000');
});
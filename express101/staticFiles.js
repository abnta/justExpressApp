const express = require('express');
const app = express();

//app comes with a use method which how mostley we invoke middlewears.
// use takes one arg(right now) :
// 1. the middlewear that we want to run
app.use(express.static('public'));


app.listen(3000,()=>{
    console.log('listening on port 3000...');
})
const express = require('express');
const app = express();
//app object has a few method
//Crud app C->post, r-> get, U->put, d->Delte.
//1.get
//default for all browsers is a get request
//2.post
//3.put 
//4.delete and all type of http requests i.e http verbs
//5. all it is an express thing not a verb but it handles all the verbs
// app.all('/',(req,res)=>{
//     res.send('<h1>Welcome to the Homepage</h1>')
// })

app.get('/',(req,res)=>{
    console.log(req);
    res.send('<h1>Welcome to the Home get page</h1>')
})
app.post('/',(req,res)=>{
    res.send('<h1>Welcome to the Home post page</h1>')
})
app.delete('/',(req,res)=>{

})
app.put('/',(req,res)=>{

})


app.listen(3000,()=>{
    console.log('listening at port 3000');
})
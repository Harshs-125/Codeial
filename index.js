const express=require('express');
const app=express();

const port=8000;

app.use('/',require('./routes'))
//setup our view-engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error : ${err}`);
    }
    else
    {
        console.log(`successfully connected to port: ${port}`)
    }
})
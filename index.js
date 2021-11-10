const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;

const db=require('./config/mongoose');

app.use('/',require('./routes'));

//setup our view-engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts);
app.use(express.static('./assets'));
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
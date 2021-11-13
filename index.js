const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// app.use(expressLayouts);

//setup our view-engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'somethingrandom',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//express routes
app.use('/',require('./routes'));

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
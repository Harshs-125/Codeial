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
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMid=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/styles',
    debug:true,
    outputStyle:'expanded',
    prefix:'/styles'
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+"/uploads"));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//setup our view-engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookies in the db
app.use(session({
    name:'codeial',
    secret:'somethingrandom',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/codiel_development",
        autoRemove:'disabled'
    }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMid.setflash);

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
const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helper')(app);
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJwt=require('./config/passport-jwt-stategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMid=require('./config/middleware');
//setting up the chat server to be used in socket.io
const http=require('http');
const chatServer=http.createServer(app);
const chatSockets=require('./config/chat_socket').chatSockets(chatServer);
const path=require('path');
chatServer.listen(5000);
console.log('chatServer is listening on port 5000');
// if(env.name=='development')
// {
//     app.use(sassMiddleware({
//         src:path.join(__dirname,env.asset_path,'/scss'),
//         dest:path.join(__dirname,env.asset_path,'/styles'),
//         debug:true,
//         outputStyle:'expanded',
//         prefix:'/styles'
//     }))
// }

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
app.use('/uploads',express.static(__dirname+"/uploads"));
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//setup our view-engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookies in the db
app.use(session({
    name:'codeial',
    secret:env.session_cookie_key,
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
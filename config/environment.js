const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});



const production={
    name:'production',
    asset_path:process.env.ASSETS_PATH,
    session_cookie_key:process.env.SESSION_COOKIE,
    db:"codeial_production",
    smtp:{
        service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.CODEIAL_USERNAME,
        pass:process.env.CODEIAL_PASSWORD
    }
    },
    google_clientID:process.env.CODEIAL_CLIENTID,
    google_clientSecret:process.env.CODEIAL_clientSecret,
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:process.env.JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }


}

module.exports=production;  

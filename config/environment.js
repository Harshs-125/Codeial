const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});


const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'somethingrandom',
    db:'codiel_development',
    smtp:{
        service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'harshdvlpr@gmail.com',
        pass:'mysispalak@123'
    }
    },
    google_clientID:"1058656455912-vss5oj4iibg0oq7oqedv3ijl7ricjder.apps.googleusercontent.com",
    goole_clientSecret:"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",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:"codeial",
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
     
}
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
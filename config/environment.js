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
    },
    },
    google_clientID:"1058656455912-vss5oj4iibg0oq7oqedv3ijl7ricjder.apps.googleusercontent.com",
    goole_clientSecret:"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",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:"codeial"
}
const production={
    name:'production'
}

module.exports=development;  
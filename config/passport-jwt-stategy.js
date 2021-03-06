const passport=require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/users');
const env=require('../config/environment');

let opts=
{
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"codeial"
}

passport.use(new jwtStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err)
        {
            console.log("Err in finding user from jwt");
            return;
        }
        if(user)
        {
            return done(null,user);
        }else
        {
            return done(null,false);
        }
    })
}));
module.exports=passport;
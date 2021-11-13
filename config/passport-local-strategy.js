const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');

//authentication function
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
      User.findOne({email:email},function(err,user){
         if(err)
         {
             console.log('err in finding user-->Passport',err);
             return done(err);
         }
         if(!user||user.password!=password)
         {
             console.log('Invalid username/password');
             return done(null,false);
         } 
         return done(null,user);
      })
    }
))
//serialize the user to decide which key to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserializer the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('err in findind user -->Passport');
            return done(err);
        }
        return done(null,user);
    });
});
 
const User = require("../models/users");
module.exports.signin = function (req, res) {
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile')
  }
  return res.render("sign_in");
};
module.exports.signup = function (req, res) {
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile')
  }
  return res.render("sign_up");
};

module.exports.create = function (req, res) {
  console.log(req.body);
    if(req.body.password!=req.body.confirm_password)
    {
        res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){
         console.log('Error in creating user while signing up');
         return;
        }

        if(!user){
            User.create(req.body,function(err,user)
            {
              if(err){console.log('Error in creating user while signing up'); return}

              return res.redirect('/users/signin');
            })
        }
        else
        {
            res.redirect('back');
        }
    })
};
module.exports.createsession = function (req, res) {
  req.flash('success','Logged in Successfully');
  return res.redirect('/');
};
module.exports.profile=function(req,res)
{ 
  User.findById(req.params.id,function(err,user){
    if(user){
      return res.render('user_profile',{user_profile:user});
    }
    return res.redirect('back');
  })
}

module.exports.destroySession=function(req,res){
  req.logout();
  req.flash('success','You have Logged out sucessfully')
  return res.redirect('/');
}

module.exports.update=function(req,res){
  if(req.user.id==req.params.id){
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
      return res.redirect('back');
    })
  }
  else
  {
    return res.status(401).send("Unauthorized request");
  }
}

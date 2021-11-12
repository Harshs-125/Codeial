const User = require("../models/users");
module.exports.signin = function (req, res) {
  return res.render("sign_in");
};
module.exports.signup = function (req, res) {
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
  //todolater
};

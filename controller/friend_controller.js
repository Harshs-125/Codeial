const FriendShip=require('../models/friendship');
const User=require('../models/users');
module.exports.addfriend=function(req,res){

    console.log(req.query.id);
    console.log(req.user.id);
    FriendShip.create(
        {
            from:req.user,
            to:req.query.id
        }
    )
    User.findOne(req.user.id,function(user,err){
        if(user)
        {
            user.friends.push(req.query.id);
            user.save();
        }
    })
}
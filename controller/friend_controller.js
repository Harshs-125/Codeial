const FriendShip=require('../models/friendship');
const User=require('../models/users');
module.exports.addfriend=async function(req,res){

    console.log(req.query.id);
    console.log(req.user.id);
    let user=await User.findById(req.user.id).populate('friends');
    let newfriend=await FriendShip.create(
        {
            from:req.user,
            to:req.query.id
        }
    )
    user.friends.push(newfriend);
    user.save();
    
    return  res.status (200).json({
        message:"request successfull"
    });
}
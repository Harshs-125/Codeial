const Post=require('../models/post');
const User=require('../models/users');
module.exports.home= async function(req,res){
  // Post.find({},function(err,posts){
  //   if(err)
  //   {
  //     console.log("error in finding post",err);
  //   }
  //   return res.render('home',{
  //     title:"Home",
  //     posts:posts
  //   })
  // })
  
  //Populating user of each post
  try{
    let posts= await Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
  let users=await  User.find({});
  return res.render('home',{
    title:"Home",
    posts:posts,
    all_users:users
  });
  }catch(err)
  {
    req.flash('error',err);
    return;
  }
    
}
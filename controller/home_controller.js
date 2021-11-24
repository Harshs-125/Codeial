const Post=require('../models/post');
const User=require('../models/users');
module.exports.home=function(req,res){
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
  Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
  .exec(function(err,posts){
    User.find({},function(err,users){
      return res.render('home',{
        title:"Home",
        posts:posts,
        all_users:users
      })
    })
  })
}
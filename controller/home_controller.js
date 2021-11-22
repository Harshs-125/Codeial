const Post=require('../models/post');
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
  Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home',{
      title:"Home",
      posts:posts
    })
  })
}
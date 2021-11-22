const Post=require('../models/post');
module.exports.posts=function(req,res){
    return res.render('posts');
}
module.exports.createPost=function(req,res)
{
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err)
    {
       if(err)
       {
           console.log("Error while creating post",err);
           return;
       }
       return res.redirect('/');
    })
}
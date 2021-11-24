const Post=require('../models/post');
const Comment=require('../models/comments');
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

module.exports.deletepost=function(req,res)
{
    Post.findById(req.params.id,function(err,post){
        //.id is given by mongoose converting object id into string
        if(post.user == req.user.id){
           post.remove();
           Comment.deleteMany({post:req.params.id},function(err,comments){
               return res.redirect('/');
           })
        }
        else
        {
            return res.redirect('/');
        }
    })
}
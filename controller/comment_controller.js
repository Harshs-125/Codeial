const Comment=require('../models/comments');
const Post=require('../models/post');
module.exports.createComment=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment)
            {
                if(err)
                {
                    console.log("err while creating comment",err);
                    return ;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}

module.exports.deleteComment=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment)
        {
            let postId=comment.post;
            comment.remove();
            comment.save();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })
}
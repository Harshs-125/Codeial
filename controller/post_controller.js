const Post=require('../models/post');
const Comment=require('../models/comments');
module.exports.posts=function(req,res){
    return res.render('posts');
}
module.exports.createPost=async function(req,res)
{
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr)
        {   console.log("post");
            try{
                post = await post.populate('user', 'name');
            }catch(err)
            {
                console.log(err);
            }
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            });
        }
        req.flash('success',"successfully created post");
        return res.redirect('/');
    }catch(err)
    {
        req.flash('error',err);
    }
}

module.exports.deletepost= async function(req,res)
{
    try{
        let post=await Post.findById(req.params.id);
        //.id is given by mongoose converting object id into string
        if(post.user == req.user.id){
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            // await Like.deleteMany({likeable: post, onModel: 'Post'});
            // await Like.deleteMany({_id: {$in: post.comments}});
           post.remove();
           await Comment.deleteMany({post:req.params.id})
           if(req.xhr)
           {   
               return res.status(200).json({
                   data:{
                       post_id:req.params.id
                   },
                   message:"post deleted"   
               })
           }
           req.flash('success',"successfully deleted post");
               return res.redirect('/');
        }
        else
        {
            return res.redirect('/');
        }
    }catch(err)
    {
        req.flash('error',err);
    }
}
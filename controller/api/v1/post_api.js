const Post =require('../../../models/post');
const Comment=require('../../../models/comments');
module.exports.post=async function(req,res){
    let posts= await Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
    return res.json(200,{
        message:"Lists of Post",
        post:posts
    })
}
module.exports.deletePost=async function(req,res){
    try{let post=await Post.findById(req.params.id);
        //.id is given by mongoose converting object id into string
        //if(post.user == req.user.id){
           post.remove();
           await Comment.deleteMany({post:req.params.id})
        //    if(req.xhr)
        //    {   
        //        return res.status(200).json({
        //            data:{
        //                post_id:req.params.id
        //            },
        //            message:"post deleted"   
        //        })
        //    }
        return res.json(200,{
            message:"Deleted Post"
        })
    }catch(err)
    {
        return res.json(500,{
            message:"internal servererror"
        })
    }
}
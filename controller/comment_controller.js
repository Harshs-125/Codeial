const Comment = require("../models/comments");
const Post = require("../models/post");
const commentMailer=require('../Mailers/comments_mailer');
module.exports.createComment = async function (req, res) {
  try{
    let post = await Post.findById(req.body.post);
    if (post) {
      let comments = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comments);
      post.save();
      comments=await comments.populate('user','name email');
      commentMailer.newComment(comments);
      if(req.xhr){
        return res.status(200).json({
          data:{
            comments:comments
          },
          message:"Commented successfully !"
        })
      }
      req.flash('success',"Successfully commented");
      res.redirect("/");
    } else {
      req.flash('error','no post with this id');
    }
  }catch(err)
  {
      req.flash('error',err);
  }
};

module.exports.deleteComment = async function (req, res) {
  let comment = await Comment.findById(req.params.id);
    if (comment) {
      let postId = comment.post;
      comment.remove();
      comment.save();
      let post=await Post.findByIdAndUpdate(
        postId,
        {$pull: {comments: req.params.id }});  // CHANGE :: destroy the associated likes for this comment
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

        if(req.xhr)
        {
          return res.status(200).json({
            data:{
              comment_id:req.params.id
            },
            message:"Comment deleted"
          })
        }
        req.flash('success',"successfully deleted comment");
        return res.redirect('back');
    } else {
      return res.redirect("back");
    }
};

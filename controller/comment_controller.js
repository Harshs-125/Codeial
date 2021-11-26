const Comment = require("../models/comments");
const Post = require("../models/post");
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
        {$pull: {comments: req.params.id }});
        req.flash('success',"successfully deleted comment");
        return res.redirect('back');
    } else {
      return res.redirect("back");
    }
};

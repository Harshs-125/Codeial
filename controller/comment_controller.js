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
      res.redirect("/");
    } else {
      console.log("no post with this id");
    }
  }catch(err)
  {
      console.log("Error",err);
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
        return res.redirect('back');
    } else {
      return res.redirect("back");
    }
};

const Post = require("../models/post");
const User = require("../models/users");

module.exports.home = async function (req, res) {
  // Post.find({},function(err,posts){
  //   if(err)
  //   {
  //     console.log("error in finding post",err);
  //   }
  //
  //Populating user of each post
  //CHANGE:populate likes in each post
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        },
      })
      .populate("comments")
      .populate("likes");
    let users = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

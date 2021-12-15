const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
  },
  //this defines the object id of the liked object
  Likeable: {
    type: String,
    required: true,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: [Post, Comment],
  },
});
const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

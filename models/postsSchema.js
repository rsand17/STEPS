const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }},
  { timestamps: true }
  );

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

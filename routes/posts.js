const express = require("express");
const postModel = require("../models/postsSchema");
const topUsersModel = require("../models/topUsersSchema");
const app = express();

app.post("/posts", async (req, res) => {
  const post = new postModel(req.body);
  const count = await postModel.countDocuments({user: post.user});

  try {
    await post.save();
    await topUsersModel.findOneAndUpdate({user: post.user}, {count: count+1}, {upsert: true, new: true});
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find({});

  try {
    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = app;

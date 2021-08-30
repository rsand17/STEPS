const express = require("express");
const postModel = require("../models/postsSchema");
const app = express();

app.post("/posts", async (req, res) => {
  const post = new postModel(req.body);

  try {
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(500);
  }
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find({});

  try {
    res.send(posts);
  } catch (error) {
    res.status(500);
  }
});

module.exports = app;

const express = require("express");
const performance = require('perf_hooks').performance;
const postModel = require("../models/postsSchema");
const topUsersModel = require("../models/topUsersSchema");
const runtimeModel = require("../models/runtimesSchema");

const app = express();

app.post("/posts", async (req, res) => {
  var t0 = performance.now()
  const post = new postModel(req.body);
  const count = await postModel.countDocuments({user: post.user});

  try {
    await post.save();
    await topUsersModel.findOneAndUpdate({user: post.user}, {count: count+1}, {upsert: true, new: true});
    var t1 = performance.now()
    const runtime = new runtimeModel({function: "create-a-post", runtime: (t1 - t0)});
    await runtime.save();
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/posts", async (req, res) => {
  var t0 = performance.now()
  const posts = await postModel.find({});
  var t1 = performance.now()
  const runtime = new runtimeModel({function: "get-posts-list", runtime: (t1 - t0)});

  try {
    await runtime.save();
    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = app;

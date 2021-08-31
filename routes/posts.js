const express = require("express");
const performance = require('perf_hooks').performance;
const postModel = require("../models/postsSchema");
const topUsersModel = require("../models/topUsersSchema");
const runtimeModel = require("../models/runtimesSchema");

const app = express();

app.post("/posts", async (req, res) => {

  try {
    var t0 = performance.now()
    const post = new postModel(req.body);
    const count = await postModel.countDocuments({user: post.user});

    await post.save();
    await topUsersModel.findOneAndUpdate({user: post.user}, {count: count+1}, {upsert: true, new: true});
    var t1 = performance.now()
    const runtime = new runtimeModel({function: "create-a-post", runtime: (t1 - t0)});
    await runtime.save();
    res.json(post);
  } catch (error) {
      return res.status(500).json({
        status:'failure',
        error: error.message
      })
  }
});

app.get("/posts", async (req, res) => {

  try {
    var t0 = performance.now()
    const dates = req.query

    if(dates.startDate === '' || dates.endDate === '' || dates.startDate === dates.endDate) {
      return res.status(400).json({
        status:'failure',
        message: 'Please ensure you pick two dates in the format (YYYY-MM-DD) that are not equal'
      })
    }

    const posts = await postModel.find({
    createdAt: {
          $gte: new Date(String(dates.startDate)),
          $lt: new Date(String(dates.endDate))
           }
    })

    var t1 = performance.now()
    const runtime = new runtimeModel({function: "get-posts-list", runtime: (t1 - t0)});

    await runtime.save();
    res.json(posts);
  } catch (error) {
    return res.status(500).json({
      status:'failure',
      error: error.message + " --- please ensure you provide startDate and endDate in the format (YYYY-MM-DD) as params"
    })
  }
});

module.exports = app;

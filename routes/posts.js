const express = require("express");
const performance = require('perf_hooks').performance;
const postModel = require("../models/postsSchema");
const topUsersModel = require("../models/topUsersSchema");
const runtimeModel = require("../models/runtimesSchema");

const app = express();

/*
*   creates a new post in the DB. Each post contains at
*   least title, body and the user who created the post.
*/

app.post("/posts", async (req, res) => {

  try {
    //create post
    var t0 = performance.now()
    const post = new postModel(req.body);
    const count = await postModel.countDocuments({user: post.user});
    await post.save();

    //update number of posts for this creator
    await topUsersModel.findOneAndUpdate({user: post.user}, {count: count+1}, {upsert: true, new: true});
    var t1 = performance.now()

    //record runtime of block above
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

/*
*   get posts list by their creation order,
*   and recieve chunks based on a date range.
*/

app.get("/posts", async (req, res) => {

  try {
    var t0 = performance.now()
    const dates = req.query

    //check if provided dates are missing or identical
    if(dates.startDate === '' || dates.endDate === '' || dates.startDate === dates.endDate) {
      return res.status(400).json({
        status:'failure',
        message: 'Please ensure you pick two dates in the format (YYYY-MM-DD) that are not equal'
      })
    }

    //retreive all posts in date range and sort from oldest to newest
    const posts = await postModel.find({
    createdAt: {
          $gte: new Date(String(dates.startDate)),
          $lt: new Date(String(dates.endDate))
           }
    }).sort({createdAt: 'asc'})
    var t1 = performance.now()

    //record runtime of block above
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

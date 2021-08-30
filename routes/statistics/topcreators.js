const express = require("express");
const postModel = require("../../models/postsSchema");
const app = express();

app.get("/statistics/topcreators", async (req, res) => {
  const count = await postModel.countDocuments({user: req.query.user});
  const response = {
    "count": count
  }

  try {
    res.json(response);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = app;

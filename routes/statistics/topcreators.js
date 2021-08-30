const express = require("express");
const postModel = require("../../models/postsSchema");
const topUsersModel = require("../../models/topUsersSchema");
const app = express();

app.get("/statistics/topcreators", async (req, res) => {
  const users = await topUsersModel.find({}).sort({count: -1}).limit(10);
  const response = {
    "users": users
  }

  try {
    res.json(response);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = app;

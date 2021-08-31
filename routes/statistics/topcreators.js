const express = require("express");
const topUsersModel = require("../../models/topUsersSchema");
const app = express();

app.get("/statistics/topcreators", async (req, res) => {

  try {
    const users = await topUsersModel.find({}).sort({count: -1}).limit(10);
    const response = {
      "topUsers": users
    }

    res.json(response);
  } catch (error) {
    return res.status(500).json({
      status:'failure',
      error: error.message
    })
  }
});

module.exports = app;

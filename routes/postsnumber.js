const express = require("express");
const postModel = require("../models/postsSchema");
const app = express();

/*
*   get the total posts number
*/

app.get("/postsnumber", async (req, res) => {

  try {
    const count = await postModel.countDocuments({});
    const response = {
      "postCount": count
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

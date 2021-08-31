const express = require("express");
const runtimeModel = require("../../models/runtimesSchema");
const app = express();

/*
*   Get the average run-time of the create-a-post and get-posts-list functions
*/

app.get("/statistics/runtimes", async (req, res) => {

  try {

    //the runtimes collection is capped at 200KB (~150 records) and will delete the oldest entry for the newest when that is reached
    const response = await runtimeModel.aggregate([{
         $group:
            {
              _id: "$function",
              avgRuntime: { $avg: "$runtime" }
            }
    }]);

    res.json(response);
  } catch (error) {
    return res.status(500).json({
      status:'failure',
      error: error.message
    })
  }
});

module.exports = app;

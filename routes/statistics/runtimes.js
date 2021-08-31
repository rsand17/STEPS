const express = require("express");
const runtimeModel = require("../../models/runtimesSchema");
const app = express();

app.get("/statistics/runtimes", async (req, res) => {

  try {
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

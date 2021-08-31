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
    res.sendStatus(500);
  }
});

module.exports = app;

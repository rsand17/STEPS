const mongoose = require("mongoose");

const RuntimesSchema = new mongoose.Schema({
  function: {
    type: String,
    required: true,
  },
  runtime: {
    type: Number,
    default: 0.0,
  },
});

const Runtimes = mongoose.model("Runtimes", RuntimesSchema);

module.exports = Runtimes;

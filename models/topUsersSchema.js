const mongoose = require("mongoose");

const TopUsersSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

const TopUsers = mongoose.model("TopUsers", TopUsersSchema);

module.exports = TopUsers;

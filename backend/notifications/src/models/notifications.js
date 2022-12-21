const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  //using default _id
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "success",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", profileSchema);

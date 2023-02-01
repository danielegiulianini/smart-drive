const mongoose = require("mongoose");

const imagesSchema = mongoose.Schema({
  //using default _id
  mimeType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("images", imagesSchema);

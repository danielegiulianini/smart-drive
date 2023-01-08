const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  //using default mongoose _id
  subject: {
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
  isRead: {
    type: Boolean,
    default: false,
  },
  recipient: {
    type: String,
  },
});

module.exports = mongoose.model("users", notificationSchema);

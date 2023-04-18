const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Course Name cannot be blank."],
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
  replyText: {
    type: String,
    required: [true, "Reply cannot be blank."],
  }
});

const replies = new mongoose.model("Reply", replySchema);

module.exports = replies;

const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User Name cannot be blank."],
  },
  userid:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  questionText: {
    type: String,
    required: [true, "Question Text cannot be blank."],
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
    default: []
  }]
});

const questions = new mongoose.model("Question", questionSchema);

module.exports = questions;

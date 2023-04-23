const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseContent",
    require: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Ratings = new mongoose.model("Ratings", ratingSchema);

module.exports = Ratings;

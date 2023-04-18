const mongoose = require("mongoose");

const courseContentSchema = new mongoose.Schema({
  creatorName: {
    type: String,
    required: [true, "Course Name cannot be blank."],
  },
  courseContentDescription: {
    type: String,
    required: [true, "Course Description cannot be blank."],
  },
  videoLink: {
    type: String,
  },
  documentLink: {
    type: String,
  },
});

const courseContent = new mongoose.model("CourseContent", courseContentSchema);

module.exports = courseContent;

const mongoose = require("mongoose");

const CourseContentSchema = new mongoose.Schema({
  creatorName:
  {
    type:String,
    required:[true,"Course Name cannot be blank."]
  },
  courseContentDescription:
  {
    type:String,
    required:[true,"Course Description cannot be blank."]
  },
  videoLink:
  {
    type:String
  },
  documentLink:
  {
    type:String
  }
});

const CourseContent = new mongoose.model("CourseContent", CourseContentSchema);

module.exports = CourseContent;

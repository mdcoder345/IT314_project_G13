const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName:
  {
    type:String,
    unique:true,
    required:[true,"Course Name cannot be blank."]
  },
  courseDescription:
  {
    type:String,
    required:[true,"Course Description cannot be blank."]
  },
  courseContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courseContent',
    default: []
  }]
  // questions:
  // [
  //   {
  //     username:
  //     {
  //       type:String,
  //       unique:true,
  //       required:[true,"Username cannot be blank"]
  //     },
  //     questionText:
  //     {
  //       type:String,
  //       required:[true,"Question cannot be blank"]
  //     },
  //     replies:
  //     [
  //       {
  //         username:
  //         {
  //           type:String,
  //           required:[true,"Username cannot be blank"]
  //         },
  //         replyText:
  //         {
  //           type:String,
  //           required:[true,"Reply cannot be blank"]
  //         }
  //       }
  //     ]
  //   }
  // ]
});

const Course = new mongoose.model("Course", CourseSchema);

module.exports = Course;

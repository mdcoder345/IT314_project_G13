const User = require("../models/User");
const Course = require("../models/Course");
const courseContent = require("../models/CourseContent");
const Question = require("../models/Questions");
const Reply = require("../models/Reply");
const Ratings = require("../models/Ratings");
const bcrypt = require("bcrypt");
const https = require("https");

const getHome = async (req, res) => {
  let username = req.session ? req.session.username : null;
  const url = "https://zenquotes.io/api/today";
  let data1 = "";
  https.get(url, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      data1 = JSON.parse(data);
      res.render("home", { username, data1 });
    });
  });
};

const getCourse = async (req, res, id) => {
  const course = await Course.findOne({ _id: id }).populate("courseContent");
  res.render("getCourse.ejs", { course });
};

const getContent = async (req, res, id1, id2) => {
  const content = await courseContent.findOne({ _id: id2 });
  res.send(content);
};

const addContent = async (req, res, id) => {
  const course = await Course.findOne({ _id: id });
  const { creatorName, courseContentDescription, videoLink, documentLink } =
    req.body;
  const content = new courseContent({
    creatorName,
    courseContentDescription,
    videoLink,
    documentLink,
  });
  try {
    const result = await content.save();
    course.courseContent.push(result);
    await course.save();
    res.send(200, "Added successfully");
  } catch (error) {
    console.log("Internal Error", error);
  }
};

const updateContent = async (req, res, id) => {
  try {
    const oldContent = await courseContent.findOne({ _id: id });
    const { creatorName, courseContentDescription, videoLink, documentLink } =
      req.body;
    const newContent = {
      creatorName,
      courseContentDescription,
      videoLink,
      documentLink,
    };
    for (let c in newContent) {
      oldContent[`${c}`] = newContent[`${c}`];
    }
    await oldContent.save();
    return res.status(200).send({
      data: oldContent,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteContent = async (req, res, id) => {
  try {
    const content = await courseContent.findOneAndDelete({ _id: id });
    return res.status(200).send({
      data: content,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addRatings = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: req.session.user_id });
    const content = await courseContent.findOne({ _id: id });
    const { rating } = req.body;
    const ratings = new Ratings({
      user,
      content,
      rating,
    });
    await ratings.save();
    return res.status(200).send({
      data: ratings,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updateRatings = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: req.session.user_id });
    const content = await courseContent.findOne({ _id: id });
    const oldRating = await Ratings.findOne({ user, content });
    const { rating: newRating } = req.body;
    oldRating.rating = newRating;
    await oldRating.save();
    return res.status(200).send({
      data: oldRating,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteRatings = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: req.session.user_id });
    const content = await courseContent.findOne({ _id: id });
    const rating = await Ratings.findOneAndDelete({ user, content });
    return res.status(200).send({
      data: rating,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const calculateRatings = async (id) => {
  try {
    let ratings = 0;
    const content = await courseContent.find({ _id: id });
    const filter = await Ratings.find({ content });
    for (let f of filter) {
      ratings += parseInt(f.rating);
    }
    ratings /= filter.length;
    ratings = Math.round(ratings);
    return ratings;
  } catch (error) {
    console.log(error);
  }
};

const registeruser = async (req, res) => {
  const { username, email, age, institute, password, confirmedPassword } =
    req.body;
  if (password != confirmedPassword) {
    res.redirect(400, "/register");
  }
  const hashPw = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    email,
    password: hashPw,
    age,
    institute,
  });
  try {
    await user.save();
    return res.redirect(200, "/login");
  } catch (error) {
    console.log("Internal Error", error);
  }
};

const loginuser = async (req, res) => {
  try {
    const { username_email, password } = req.body;
    const foundUsername = await User.findOne({ username: username_email });
    const foundUseremail = await User.findOne({ email: username_email });
    const foundUser = foundUsername || foundUseremail;
    if (!foundUser) {
      req.flash("message", "Invalid Credentials!");
      return res.redirect(400, "/login");
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      req.flash("message", "Invalid Credentials!");
      return res.redirect(200, "/login");
    } else {
      req.flash("message", "Successfully Logged in!");
      req.session.user_id = foundUser._id;
      req.session.username = foundUser.username;
      return res.redirect(200, "/");
    }
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const createCourse = async (req, res) => {
  const { courseName, courseDescription } = req.body;
  const course = new Course({
    courseName,
    courseDescription,
  });
  try {
    await course.save();
    return res.redirect(200, "/courses");
  } catch (error) {
    console.log("Internal Error", error);
    return res.redirect(400, "/courses");
  }
};

const getCourses = async (req, res) => {
  let username = req.session ? req.session.username : null;
  const courses = await Course.find();
  res.render("course_new", { data: courses, username });
};

const updateCourse = async (req, res) => {
  const { courseName, courseDescription } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    const course = await Course.findById(id);
    console.log(course);
    course.courseName = courseName;
    course.courseDescription = courseDescription;
    await course.save();
    return res.status(200).send({
      data: course,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    await course.remove();
    return res.status(200).send({
      data: course,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal Server Error",
    });
  }
};

const addQuestion = async (req, res, id) => {
  const course = await Course.findOne({ _id: req.params.id });
  const _id = req.session.user_id;
  const user = await User.findOne({ _id });
  const { questionText } = req.body;
  const question = new Question({
    userid: _id,
    username: user.username,
    questionText,
  });
  try {
    const result = await question.save();
    course.questions.push(result);
    await course.save();
    return res.status(200).json({
      data: question,
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Internal Error", error);
    return res.status(404).json({
      data: {},
      success: false,
      error: error,
    });
  }
};

const updateQuestion = async (req, res, id) => {
  const question = await Question.findOne({ _id: id });
  const course_id = req.body.courseId;
  const _id = req.session.user_id;
  let q_id = question.userid.toString();
  if (q_id === _id) {
    try {
      const { questionText } = req.body;
      question.questionText = questionText;
      await question.save();
      return res.status(200).json({
        data: question,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log("Internal Error", error);
      return res.status(404).json({
        data: {},
        success: false,
        error: error,
      });
    }
  } else {
    console.log("Not authenticated user");
    return res.status(404).json({
      data: {},
      success: false,
      error: "Not authenticated user",
    });
  }
};

const deleteQuestion = async (req, res, id) => {
  const question = await Question.findOne({ _id: id });
  const course_id = req.body.courseId;
  const _id = req.session.user_id;
  let q_id = question.userid.toString();
  if (q_id === _id) {
    try {
      const quest = await Question.findByIdAndDelete(id);
      console.log("Deleted successfully");
      return res.status(200).json({
        data: quest,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log("Internal Error", error);
      return res.status(404).json({
        data: {},
        success: false,
        error: error,
      });
    }
  } else {
    console.log("Not authenticated user");
    return res.status(404).json({
      data: {},
      success: false,
      error: "Not authenticated user",
    });
  }
};

const addReply = async (req, res, id) => {
  const question = await Question.findOne({ _id: req.params.id });
  const _id = req.session.user_id;
  const user = await User.findOne({ _id });
  const { replyText } = req.body;
  const reply = new Reply({
    userid: _id,
    username: user.username,
    replyText,
  });
  try {
    const result = await reply.save();
    question.replies.push(result);
    await question.save();
    return res.status(200).json({
      data: reply,
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Internal Error", error);
    return res.status(404).json({
      data: {},
      success: false,
      error: error,
    });
  }
};

const updateReply = async (req, res, id) => {
  const reply = await Reply.findById(id);
  const _id = req.session.user_id;
  let r_id = reply.userid.toString();
  if (r_id === _id) {
    try {
      const { replyText } = req.body;
      reply.replyText = replyText;
      await reply.save();
      console.log("Updated successfully");
      return res.status(200).json({
        data: reply,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log("Internal Error", error);
      return res.status(404).json({
        data: {},
        success: false,
        error: error,
      });
    }
  } else {
    console.log("Not authenticated user");
    return res.status(404).json({
      data: {},
      success: false,
      error: "Not authenticated user",
    });
  }
};

const deleteReply = async (req, res, id) => {
  const reply = await Reply.findById(id);
  const _id = req.session.user_id;
  let r_id = reply.userid.toString();
  if (r_id === _id) {
    try {
      const rep = await Reply.findByIdAndDelete(id);
      console.log("Deleted successfully");
      return res.status(200).json({
        data: rep,
        success: true,
        error: null,
      });
    } catch (error) {
      console.log("Internal Error", error);
      return res.status(404).json({
        data: {},
        success: false,
        error: error,
      });
    }
  } else {
    console.log("Not authenticated user");
    return res.status(404).json({
      data: {},
      success: false,
      error: "Not authenticated user",
    });
  }
};

const logoutUser = async (req, res) => {
  req.session.user_id = null;
  req.session.username = null;
  req.flash("message", "Logged out successfully!");
  res.redirect("/");
};

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.session.user_id) {
    req.flash("message", "You are already logged in!");
    return res.redirect("/");
  }
  next();
};

module.exports = {
  getHome,
  registeruser,
  loginuser,
  logoutUser,
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  requireLogin,
  getCourse,
  addContent,
  isLoggedIn,
  addQuestion,
  addReply,
  getContent,
  updateContent,
  deleteContent,
  addRatings,
  updateRatings,
  deleteRatings,
  calculateRatings,
  updateQuestion,
  deleteQuestion,
  updateReply,
  deleteReply,
};

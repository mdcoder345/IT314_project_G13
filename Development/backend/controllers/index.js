const User = require("../models/User");
const Course = require("../models/Course");
const courseContent = require("../models/CourseContent");
const Question = require("../models/Questions");
const Reply = require("../models/Reply");
const bcrypt = require("bcrypt");

const getHome = (req, res) => {
  res.render("home");
};

const viewOneCourse = async (req, res, id) => {
  const course = await Course.findOne({ _id: id });
  res.render("viewOneCourse.ejs", { course });
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
    res.send(200,"Added successfully");
  } catch (error) {
    console.log("Internal Error", error);
  }
};

const registeruser = async (req, res) => {
  const { username, email, age, institute, password, confirmedPassword } =
    req.body;
  if (password != confirmedPassword) {
    res.redirect(400,"/register");
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
    return res.redirect(200,"/login");
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
      return res.redirect(400,"/login");
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      req.flash("message", "Invalid Credentials!");
      
      return res.redirect(400,"/login");
    } else {
      req.flash("message", "Successfully Logged in!");
      req.session.user_id = foundUser._id;
      req.session.username = foundUser.username;
      return res.redirect(200,"/");
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
    return res.redirect(200,"/courses");
  } catch (error) {
    console.log("Internal Error", error);
    return res.redirect(400,"/courses");

  }
};

const getCourses = async (req, res) => {
  let username = req.session ? req.session.username : null;
  const courses = await Course.find();
  console.log(courses);
  res.render("course_new", { data: courses, username });
};

const updateCourse = async (req, res) => {
  console.log("Hello");
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
    console.log(course);
    await course.remove();
    console.log(course);
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
  console.log("Hello");
  const course = await Course.findOne({ _id: req.params.id });
  
  const _id = req.session.user_id;
  const user = await User.findOne({ _id });
  const { questionText } = req.body;
  const question = new Question({
    userid: _id,
    username : user.username,
    questionText,
  });
  try {
    const result = await question.save();
    course.questions.push(result);
    await course.save();
    res.send("Added successfully");
  }
  catch (error) {
    console.log("Internal Error", error);
  }
}

  
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
  //console.log(req.session.user_id);
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
  viewOneCourse,
  addContent,
  isLoggedIn,
  addQuestion
};

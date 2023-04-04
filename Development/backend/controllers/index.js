const User = require("../models/User");
const Course = require("../models/Course");
const courseContent = require("../models/CourseContent");
const bcrypt = require("bcrypt");

const getHome = (req, res) => {
  res.render("home");
};

const view_course = async (req, res) => {
  const showCourses = req.query.showCourses === "true";
  const courses = await Course.find();
  res.render("view_courses.ejs", {
    courses: courses,
    showCourses: showCourses,
  });
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
    res.send("Added successfully");
  } catch (error) {
    console.log("Internal Error", error);
  }
};

const registeruser = async (req, res) => {
  const { username, email, age, institute, password, confirmedPassword } =
    req.body;
  if (password != confirmedPassword) {
    res.redirect("/register");
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
    return res.redirect("/login");
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
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      res.send("FAILED TO LOGIN!!");
    } else {
      req.session.user_id = foundUser._id;
      res.redirect("/");
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
    return res.redirect("/courses");
  } catch (error) {
    console.log("Internal Error", error);
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).send({
      data: courses,
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

const logoutUser = async (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
};

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
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
  view_course,
  viewOneCourse,
  addContent,
};

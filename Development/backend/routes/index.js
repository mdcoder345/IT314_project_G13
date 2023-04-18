const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../controllers/index");
const User = require("../models/User");

router.get("/", async (req, res) => {
  let username = req.session ? req.session.username : null;
  res.render("home", { username });
});

router.get("/courses", auth.requireLogin, (req, res) => {
  auth.getCourses(req, res);
});

router.get("/courses/view", auth.requireLogin, (req, res) => {
  auth.view_course(req, res);
});

router.get("/courses/view/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.viewOneCourse(req, res, id);
});

router.get("/courses/add/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  res.render("addContent.ejs", { id });
});

router.post("/courses/add/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addContent(req, res, id);
});

router.get("/add-course", auth.requireLogin, (req, res) => {
  res.render("courseRegistration");
});
router.post("/add-course", auth.requireLogin, (req, res) => {
  auth.createCourse(req, res);
});

router.patch("/courses/:id", auth.requireLogin, (req, res) => {
  auth.updateCourse(req, res);
});

router.delete("/courses/:id", auth.requireLogin, (req, res) => {
  auth.deleteCourse(req, res);
});

router.get("/logout",auth.isLoggedIn,(req,res)=>{
  auth.logoutUser(req,res);
})
module.exports = router;

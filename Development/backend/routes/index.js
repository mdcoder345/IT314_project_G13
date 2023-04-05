const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../controllers/index");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/courses", auth.requireLogin, (req, res) => {
  res.render("course_new");
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

router.post("/courses", auth.requireLogin, (req, res) => {
  auth.createCourse(req, res);
});

router.patch("/courses/:id", auth.requireLogin, (req, res) => {
  auth.updateCourse(req, res);
});

router.delete("/courses/:id", auth.requireLogin, (req, res) => {
  auth.deleteCourse(req, res);
});

module.exports = router;

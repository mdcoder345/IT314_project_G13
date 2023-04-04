const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../controllers/index");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/courses", auth.requireLogin, (req, res) => {
  res.render("courses");
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

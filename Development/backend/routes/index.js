const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../controllers/index");
const User = require("../models/User");

router.get("/", (req, res) => {
  auth.getHome(req,res);
});

router.get("/aboutUs", async (req, res) => {
  let username = req.session ? req.session.username : null;
 res.render("aboutUs", { username });
});

router.get("/courses", auth.requireLogin, (req, res) => {
  auth.getCourses(req, res);
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



router.get("/courses/add/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  res.render("addContent.ejs", { id });
});

router.post("/courses/add/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addContent(req, res, id);
});

router.get("/courses/view/:id", auth.requireLogin, (req, res) => {
  let username = req.session ? req.session.username : null;
  const { id } = req.params;
  auth.viewOneCourse(req, res, id);
});

router.get("/courses/question/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  res.render("questions.ejs", { id });
});

router.post("/courses/question/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addQuestion(req, res,id);
});

router.patch("/courses/update-question/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
  //console.log(id);
  auth.updateQuestion(req, res,id);
});

router.delete("/courses/delete-question/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
  console.log(id);
  auth.deleteQuestion(req, res,id);
});

router.get("/courses/question/reply/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
});

router.post("/courses/question/reply/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addReply(req, res,id);
});

router.patch("/courses/update-reply/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.updateReply(req, res,id);
});

router.delete("/courses/delete-reply/:id",auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.deleteReply(req, res,id);
});


router.get("/logout",auth.isLoggedIn,(req,res)=>{
  auth.logoutUser(req,res);
})
module.exports = router;

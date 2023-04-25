const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../controllers/index");
const User = require("../models/User");

router.get("/", (req, res) => {
  auth.getHome(req, res);
});

router.get("/aboutUs", async (req, res) => {
  let username = req.session ? req.session.username : null;
  res.render("aboutUs", { username });
});

router.get("/contactus",async (req,res) => {
  let username = req.session ? req.session.username : null;
  res.render("contactUs", { username });
});

router.post("/contactus",(req,res) => {
  auth.contactus(req,res);
});

router.get("/courses", auth.requireLogin, (req, res) => {
  auth.getCourses(req, res);
});


router.post("/courses", auth.requireLogin, (req, res) => {
  if(req.body.searchname!=null)
  {
    auth.searchCourse(req,res);
  }
  else
  {
    auth.createCourse(req, res);
  }
});

router.patch("/courses/:id", auth.requireLogin, (req, res) => {
  auth.updateCourse(req, res);
});

router.delete("/courses/:id", auth.requireLogin, (req, res) => {
  auth.deleteCourse(req, res);
});

router.get("/courses/view/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.getCourse(req, res, id);
});

router.get("/courses/view/:id1/:id2", auth.requireLogin, (req, res) => {
  const { id1, id2 } = req.params;
  auth.getContent(req, res, id1, id2);
});

router.get("/courses/add/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  res.render("addContent.ejs", { id });
});

router.post("/courses/add/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addContent(req, res, id);
});

router.patch("/courses/update/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.updateContent(req, res, id);
});

router.delete("/courses/delete/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.deleteContent(req, res, id);
});

router.post("/courses/ratings/:id", auth.requireLogin, (req, res) => {
  auth.addRatings(req, res);
});

router.patch("/courses/ratings/:id", auth.requireLogin, (req, res) => {
  auth.updateRatings(req, res);
});

router.delete("/courses/ratings/:id", auth.requireLogin, (req, res) => {
  auth.deleteRatings(req, res);
});

router.get("/courses/question/:id", auth.requireLogin, (req, res) => {
  auth.getQuestions(req, res, req.params.id);
});

router.post("/courses/question/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addQuestion(req, res, id);
});

router.patch("/courses/update-question/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  //console.log(id);
  auth.updateQuestion(req, res, id);
});

router.delete("/courses/delete-question/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  console.log(id);
  auth.deleteQuestion(req, res, id);
});

// router.get("/courses/question/reply/:id", auth.requireLogin, (req, res) => {
//   const { id } = req.params;
//   auth.getReplies(req, res, id);
// });

router.post("/courses/question/reply/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.addReply(req, res, id);
});


router.delete("/courses/delete-reply/:id", auth.requireLogin, (req, res) => {
  const { id } = req.params;
  auth.deleteReply(req, res, id);
});

router.get("/logout", auth.isLoggedIn, (req, res) => {
  auth.logoutUser(req, res);
});

router.get("/terms-of-use",(req,res)=>{
  
  res.render("terms");
})

router.get("/privacy-policy",(req,res)=>{
  res.render("privacy");
})

router.get("/user-profile",(req,res)=>{
  res.render("user_profile", { username: req.session.username ,role:req.session.role});
});

router.get("/user-info",(req,res)=>{
  auth.getUsers(req,res);
});

router.delete("/user/:id", auth.requireLogin, (req, res) => {
  const {id} = req.params.id;
  auth.deleteUser(req, res, id);
});

module.exports = router;

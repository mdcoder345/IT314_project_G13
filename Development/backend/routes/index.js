const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../controllers/index");

router.get("/",(req,res)=>{
  res.render("home");
})
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  auth.registeruser(req, res);
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  auth.loginuser(req, res);
});

router.post("/logout", (req, res) => {
  auth.logoutUser(req, res);
});
router.get("/courses", (req, res) => {
  auth.requireLogin(req, res);
  res.render("courses");
})
router.post("/courses", (req, res) => {
  auth.requireLogin(req, res, "courses");
  auth.createCourse(req, res);
})
router.patch("/courses/:id", (req, res) => {
  auth.requireLogin(req, res);
  auth.updateCourse(req, res);
});
router.delete("/courses/:id", (req, res) => {
  auth.requireLogin(req, res);
  auth.deleteCourse(req, res);
});
router.get("/test", (req, res) => {
  auth.requireLogin(req, res);
});
module.exports = router;

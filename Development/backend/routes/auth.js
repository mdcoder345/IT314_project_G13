const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const auth = require("../controllers/index");

router.get("/register", auth.isLoggedIn, (req, res) => {
  res.render("auth/register");
});

router.post("/register", auth.isLoggedIn, async (req, res) => {
  auth.registeruser(req, res);
});

router.get("/login", auth.isLoggedIn, (req, res) => {
  res.render("auth/login");
});

router.post("/login", auth.isLoggedIn, async (req, res) => {
  auth.loginuser(req, res);
});

router.post("/logout", (req, res) => {
  auth.logoutUser(req, res);
});

router.get("/test", auth.requireLogin, (req, res) => {
  res.send("Secret Route");
});
module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const auth = require("../controllers/index");

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

module.exports = router;

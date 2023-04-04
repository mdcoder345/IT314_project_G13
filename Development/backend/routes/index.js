const express = require("express");
const router = express.Router();

const { getHome,
    registeruser,
    loginuser,
    view_course
} = require("../controllers/index");

router.get("/", getHome);
router.post("/adduser",registeruser);
router.post("/loginuser",loginuser);
router.get("/view_courses", view_course);
module.exports = router;

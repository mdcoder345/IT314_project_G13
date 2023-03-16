const express = require("express");
const router = express.Router();

const { getHome,
    registeruser,
    loginuser
} = require("../controllers/index");

router.get("/", getHome);
router.post("/adduser",registeruser);
router.post("/loginuser",loginuser);

module.exports = router;

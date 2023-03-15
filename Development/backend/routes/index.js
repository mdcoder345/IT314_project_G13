const express = require("express");
const router = express.Router();

const { getHome} = require("../controllers/index");

router.get("/", getHome);


module.exports = router;

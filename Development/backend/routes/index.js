const express = require("express");
const router = express.Router();

const { getHome, getIsha, getJourney } = require("../controllers/index");

router.get("/", getHome);
router.get("/isha", getIsha);
router.get("/journey", getJourney);

module.exports = router;

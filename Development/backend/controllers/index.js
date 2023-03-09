const getHome = (req, res) => {
  res.render("home");
};

const getIsha = (req, res) => {
  res.render("isha");
};

const getJourney = (req, res) => {
  res.render("journey");
};

module.exports = { getHome, getIsha, getJourney };

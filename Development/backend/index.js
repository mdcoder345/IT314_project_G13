const express = require("express");
const app = express();
const path = require("path");
const indexRoutes = require("./routes/index");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use(indexRoutes);

app.listen(3000, () => {
  console.log("The server is listening on PORT", 3000);
});

module.exports = app;

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const indexRoutes = require("./routes/index");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static("../frontend/public"));

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://isha_121:1234@cluster0.w0kyzdk.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("Connect to DB Succesfully!!"))
.catch((error)=>console.log(error));

app.use(indexRoutes);
app.listen(3000, () => {
  console.log("The server is listening on PORT", 3000);
});

module.exports = app;

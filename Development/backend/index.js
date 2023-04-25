require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const flash = require("connect-flash");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const methodOverride = require("method-override");

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://isha_121:1234@cluster0.w0kyzdk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect to DB Succesfully!!"))
  .catch((error) => console.log(error));

const sessionObject = {
  secret: "process.env.SECRET_KEY",
  saveUninitialized: false,
  resave: false,
  store: mongoStore.create({
    mongoUrl:
      "mongodb+srv://isha_121:1234@cluster0.w0kyzdk.mongodb.net/?retryWrites=true&w=majority",
  }),
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(session(sessionObject));
app.use(flash());
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.messages = req.flash("message");
  res.locals.ratingMessage = req.flash("ratingMessage");
  res.locals.registerMessage = req.flash("registerMessage");
  next();
});

app.use("/", authRoutes);
app.use("/", indexRoutes);
if (!module.parent) {
  app.listen(`${PORT}`, () => {
    console.log(`The server is listening on PORT ${PORT}`);
  });
}

module.exports = app;

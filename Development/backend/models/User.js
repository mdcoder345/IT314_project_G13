const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
  age: {
    type: Number,
    required: [true, "Age cannot be blank"],
  },
  institute: {
    type: String,
  },
  role:
  {
    type: String,
    enum: ["admin", "user"], // enum is an array of strings
    default: "user"
  }
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;

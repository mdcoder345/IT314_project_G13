const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username:{
    type: String
   },
  email:
   {
    type:String
   },
   password:
   {
    type:String
   },
   age:
   {
    type:Number
   },
   institute:
   {
    type:String
   }
});

const User = new mongoose.model("User",UserSchema);

module.exports = User;
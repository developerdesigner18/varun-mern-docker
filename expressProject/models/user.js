var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, unique: true },
  name: String,
  biodata: String,
  profile_pic: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

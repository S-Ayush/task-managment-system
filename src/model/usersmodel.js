const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  designation: String,
});
const userList = mongoose.model("login", userSchema);

module.exports = userList;

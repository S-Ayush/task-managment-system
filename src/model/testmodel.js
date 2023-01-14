const mongoose = require("mongoose");
const testschema = new mongoose.Schema({
  name: String,
  email: String,
});
const testModel = new mongoose.model("test", testschema);

module.exports = testModel;

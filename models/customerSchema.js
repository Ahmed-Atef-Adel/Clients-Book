const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema structure
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  age: Number,
  country: String,
  gender: String,
});

// Create a model based on that Schema
const User = mongoose.model("customer", userSchema);

// export the model
module.exports = User;

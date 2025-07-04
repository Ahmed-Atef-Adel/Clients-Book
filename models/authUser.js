const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema structure
const authUserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

// Create a model based on that schema
// "User" that name that created on databse
const AuthUser = mongoose.model("User", authUserSchema);

// export the model
module.exports = AuthUser;

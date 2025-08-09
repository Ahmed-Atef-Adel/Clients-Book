const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the schema structure
const authUserSchema = new Schema({
  profileImage: String,
  username: String,
  email: String,
  password: String,
  customerInfo: [
    {
      firstName: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      age: String,
      country: String,
      gender: String,
      createdAt: Date,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});
// {timestamps: true}

// Hashing Password

authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a model based on that schema
// "User" that name that created on databse
const AuthUser = mongoose.model("User", authUserSchema);

// export the model
module.exports = AuthUser;

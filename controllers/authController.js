const AuthUser = require("../models/authUser");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authUser_signout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const authUser_welcome_get = (req, res) => {
  res.render("Welcome");
};

const authUser_login_get = (req, res) => {
  res.render("auth/login");
};

const authUser_signup_get = (req, res) => {
  res.render("auth/signup");
};

const authUser_signup_post = async (req, res) => {
  try {
    // Check validation (email & password)
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({ arrValidationError: objError.errors });
    }
    // Check if email already exist ?
    const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ existEmail: "This email is already exist." });
    }
    // Create new user and login
    const newUser = await AuthUser.create(req.body);
    var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: newUser._id });
  } catch (error) {
    console.log(error);
  }
};

const authUser_login_post = async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });

    if (loginUser == null) {
      return res.json({
        notExistEmail: "This email is not exist, Try to signup.",
      });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        var token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: loginUser._id });
      } else {
        return res.json({
          inCorrectPass: `Password is not correct for ${req.body.email}`,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authUser_signout_get,
  authUser_welcome_get,
  authUser_login_get,
  authUser_signup_get,
  authUser_signup_post,
  authUser_login_post,
};

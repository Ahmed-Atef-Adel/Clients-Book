const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var authRequired = require("../middleware/middleware");
const checkIfLogin = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");

// router.get("*", checkIfLogin);

//Level 2
// Get request

router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

router.get("/", checkIfLogin, (req, res) => {
  res.render("Welcome");
});

router.get("/login", checkIfLogin, (req, res) => {
  res.render("auth/login");
});

router.get("/signup", checkIfLogin, (req, res) => {
  res.render("auth/signup");
});

// Post request
router.post(
  "/signup",
  [
    check("email", "please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  checkIfLogin,
  async (req, res) => {
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
      var token = jwt.sign({ id: newUser._id }, "Ahmed");
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: newUser._id });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });

    if (loginUser == null) {
      return res.json({
        notExistEmail: "This email is not exist, Try to signup.",
      });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        var token = jwt.sign({ id: loginUser._id }, "Ahmed");
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
});

//-------------------------------

// Level 1
// Get request

router.get("/home", checkIfLogin, authRequired, userController.user_index_get);
router.get(
  "/edit/:id",
  checkIfLogin,
  authRequired,
  userController.user_edit_get
);
router.get(
  "/view/:id",
  checkIfLogin,
  authRequired,
  userController.user_view_get
);

// Post request

router.post("/search", checkIfLogin, userController.user_search_post);

//Put request:

router.put("/edit/:id", checkIfLogin, userController.user_put);

// Delete request

router.delete("/edit/:id", checkIfLogin, userController.user_delete);

module.exports = router;

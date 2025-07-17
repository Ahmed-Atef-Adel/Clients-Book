const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var authRequired = require("../middleware/middleware");
const checkIfLogin = require("../middleware/middleware");

// router.get("*", checkIfLogin);

//Level 2
// Get request

router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

router.get("/", checkIfLogin, (req, res) => {
  console.log("Hiiiiiiiiiii");
  res.render("Welcome");
});

router.get("/login", checkIfLogin, (req, res) => {
  res.render("auth/login");
});

router.get("/signup", checkIfLogin, (req, res) => {
  res.render("auth/signup");
});

// Post request
router.post("/signup", checkIfLogin, async (req, res) => {
  try {
    const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });
    console.log(isCurrentEmail);
    if (isCurrentEmail) {
      console.log("This email already exist.");
      res.render("auth/signup");
      return;
    }
    const result = await AuthUser.create(req.body);
    res.render("auth/login");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    console.log(loginUser);
    if (loginUser == null) {
      console.log("This email is not exist in DATABASE !");
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        console.log("Correct email and password");
        var token = jwt.sign({ id: loginUser._id }, "Ahmed");
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.redirect("/home");
        console.log(loginUser);
      } else {
        console.log("Wrong password");
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

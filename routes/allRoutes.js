const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Level 2
// Get request

router.get("/", (req, res) => {
  res.render("Welcome");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// Post request
router.post("/signup", async (req, res) => {
  try {
    const result = await AuthUser.create(req.body);
    console.log(result);
    res.render("auth/login");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("----------------------");
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
      } else {
        console.log("Wrong password");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------

// Level 1
// Get request

router.get("/home", userController.user_index_get);
router.get("/edit/:id", userController.user_edit_get);
router.get("/view/:id", userController.user_view_get);

// Post request

router.post("/search", userController.user_search_post);

//Put request:

router.put("/edit/:id", userController.user_put);

// Delete request

router.delete("/edit/:id", userController.user_delete);

module.exports = router;

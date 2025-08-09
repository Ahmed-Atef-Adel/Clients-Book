const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
var authRequired = require("../middleware/middleware");
const checkIfLogin = require("../middleware/middleware");
const { check } = require("express-validator");

const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });



// router.get("*", checkIfLogin);

//Level 3
// post request

router.post(
  "/update-profile",
  upload.single("avatar"),
  authController.post_profileImage
);

//Level 2
// Get request

router.get("/signout", authController.authUser_signout_get);

router.get("/", checkIfLogin, authController.authUser_welcome_get);

router.get("/login", checkIfLogin, authController.authUser_login_get);

router.get("/signup", checkIfLogin, authController.authUser_signup_get);

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
  authController.authUser_signup_post
);

router.post("/login", authController.authUser_login_post);

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

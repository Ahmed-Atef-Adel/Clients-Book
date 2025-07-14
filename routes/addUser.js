const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
var authRequired = require("../middleware/middleware");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/authUser");


const checkIfLogin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // Login user
    // decoded is equal data that in jwt so it's contain id and email ..etc.
    jwt.verify(token, "Ahmed", async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const loginUser = await AuthUser.findById(decoded.id);
        res.locals.user = loginUser;
        next();
      }
    });
  } else {
    // No login user
    res.locals.user = null;
    next();
  }
};

router.get("", authRequired, checkIfLogin, userController.user_add_get);
router.post("", authRequired, checkIfLogin, userController.user_post);

module.exports = router;

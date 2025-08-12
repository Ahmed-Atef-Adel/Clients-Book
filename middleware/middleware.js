var jwt = require("jsonwebtoken");
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

const authRequired = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "Ahmed", (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = (authRequired, checkIfLogin);

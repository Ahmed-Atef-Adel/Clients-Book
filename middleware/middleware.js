var jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  console.log("befor run the function");
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

module.exports = authRequired;

const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const userController = require("../controllers/userController");

//-----------------------------------------------------

// Get request

router.get("/", userController.aaa);

router.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

router.get("/edit/:id", userController.bbb);

router.get("/view/:id", userController.ccc);

//-----------------------------------------------------

// Post request

router.post("/user/add.html", userController.eee);

router.post("/search", userController.fff);

//-----------------------------------------------------

// Delete request

router.delete("/edit/:id", userController.ddd);

// router.delete("/edit/:id", (req, res) => {
//   User.findByIdAndDelete(req.params.id, req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//-----------------------------------------------------

//Put request:

router.put("/edit/:id", userController.mmm);

// router.put("/edit/:id", (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;

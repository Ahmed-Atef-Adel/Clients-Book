const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user/add", userController.user_add_get);
router.post("/user/add", userController.user_post);

module.exports = router;

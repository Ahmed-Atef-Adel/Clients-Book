const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("", userController.user_add_get);
router.post("", userController.user_post);

module.exports = router;
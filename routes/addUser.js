const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
var authRequired = require("../middleware/middleware");

router.get("", authRequired, userController.user_add_get);
router.post("", authRequired, userController.user_post);

module.exports = router;
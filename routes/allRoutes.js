const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get request

router.get("/", userController.user_index_get);
router.get("/edit/:id", userController.user_edit_get);
router.get("/view/:id", userController.user_view_get);

// Post request

router.post("/search", userController.user_search_post);

//Put request:

router.put("/edit/:id", userController.user_put);

// Delete request

router.delete("/edit/:id", userController.user_delete);

module.exports = router;
